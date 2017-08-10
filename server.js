// jquery-express-file-upload/server.js

// TODO: Use npm package multer ? https://www.npmjs.com/package/multer
// "Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
// NOTE: Multer will not process any form which is not multipart (multipart/form-data)."

require('rootpath')();

const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const config = require('./config');			// I.e. ./config.json

const app = express();

const serverListenPort = config.listenPort;	// || 3000;
 
app.use(fileUpload());

app.get('/', function (req, res) {
	console.log('GET /');
	res.sendFile(__dirname + '/index.html'); // TW TODO: Use path.join
});

app.post('/', function(req, res) {
	console.log('POST /');
	console.log('req.files is', req.files);

	if (req.files && req.files.file) {
		// TODO: If the directory __dirname + '/uploads does not exist, create it.
		let fileObject = req.files.file;
		var destPath = __dirname + '/uploads/' + fileObject.name;
		fs.writeFile(destPath, fileObject.data, function (errorWriteFile) {
			
			if (errorWriteFile) {
				console.error('Error while saving uploaded file:', error);
				res.status(500).send('Error while saving uploaded file.');
			} else {
				console.log('Uploaded file successfully saved.');
				res.send('Uploaded file successfully saved.');
			}
		});
	} else {
		console.error('req.files is empty or req.files.file is empty.');
		res.status(500).send('req.files is empty or req.files.file is empty.');
	}
});

app.get('/jquery.min.js', function (req, res) {
	// res.redirect('https://code.jquery.com/jquery-3.2.1.min.js');
	res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
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
