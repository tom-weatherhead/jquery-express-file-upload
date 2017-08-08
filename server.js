// jquery-express-file-upload/server.js

require('rootpath')();

//var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

var config = require('./config');			// I.e. ./config.json

var app = express();

let serverListenPort = config.listenPort;	// 3000;

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

// app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
// app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// Routes:

// app.controller : Alternative 1:
// app.use('/app', require('./controllers/app.controller'));

// app.controller : Alternative 2:
// var router = express.Router();
// router.use('/', express.static('app'));
// app.use('/app', router);

// app.use('/api/users', require('./controllers/api/users.controller'));
// app.use('/api/bills', require('./controllers/api/bills.controller'));

const fileUpload = require('express-fileupload');
 
// Default options 
app.use(fileUpload());
 
// app.use(bodyParser.text());	// Text is the default body-parser anyways.

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html'); // TW TODO: Use path.join
});

app.post('/', function(req, res) {
	console.log('req.files is', req.files);
	res.send('Response to POST to / : OK');
});
	
app.post('/foo', function(req, res) {

	if (req.files) {
		var csv_parse = require('csv-parse');
		var csv_parse_options = {};
		// var csv_parse_options = { comment: '#' };
		var input = req.files.csvfile.data.toString('utf8');
		
		csv_parse(input, csv_parse_options, function(error, output) {
			
			if (error) {
				console.error('/app/upload_form_csv : Boom! .csv parsing error:', error);
				// res.status(500).send('Boom! .csv parsing error.');
				res.status(500).send(error);
			} else {
				// res.send(JSON.stringify(output));

				// The slice(1) omits the first row of the array, which contains the column headers.
				output = output.slice(1).map(function(row) {
					return {
						transactionDate: row[0],
						transactionType: row[1],
						vendorName: row[2],
						transactionMemo: row[3],
						transactionAmount: row[4]
					};
				});

				console.log('/app/upload_form_csv : Sending JSON response.');
				res.json(output);
			}
		});
	} else {
		console.error('/app/upload_form_csv : req.files is empty.');
		res.status(500).send('req.files is empty.');
	}
});

// Start the server:

var server = app.listen(serverListenPort, function () {
	let host = server.address().address;
	
	if (host === '::') {
		host = 'localhost';
	}

	console.log('The Express.js server is listening at http://%s:%s (protocol %s)', host, server.address().port, server.address().family);
});

// End of File.
