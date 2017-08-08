// jquery-express-file-upload/server.js

require('rootpath')();

//var bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const config = require('./config');			// I.e. ./config.json

const app = express();

const serverListenPort = config.listenPort;	// 3000;
 
app.use(fileUpload());
// app.use(bodyParser.text());	// Text is the default body-parser anyways.

app.get('/', function (req, res) {
	console.log('GET /');
	res.sendFile(__dirname + '/index.html'); // TW TODO: Use path.join
});

app.post('/', function(req, res) {
	console.log('POST /');
	console.log('req.files is', req.files);
	//res.send('Response to POST to / : OK');

	if (req.files) {
		// TODO: If the directory __dirname + '/uploads does not exist, create it.
		var destPath = __dirname + '/uploads/' + req.files.file.name;
		fs.writeFile(destPath, req.files.file.data, function (errorWriteFile) {
			
			if (errorWriteFile) {
				console.error('Error while saving uploaded file:', error);
				res.status(500).send('Error while saving uploaded file.');
			} else {
				console.log('Uploaded file successfully saved.');
				res.send('Uploaded file successfully saved.');
			}
		});
	} else {
		console.error('req.files is empty.');
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
