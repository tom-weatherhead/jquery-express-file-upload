// jquery-express-file-upload/server.js

// TODO: Use npm package multer ? https://www.npmjs.com/package/multer
// "Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
// NOTE: Multer will not process any form which is not multipart (multipart/form-data)."

// Use "mocha" and "supertest" to do unit testing: See https://www.npmjs.com/package/supertest
// - For examples of this kind of testing, see "connect" : https://github.com/senchalabs/connect
// - Better still, see https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

// require('rootpath')();

const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const config = require('./config');			// I.e. ./config.json

const app = express();

const serverListenPort = config.listenPort;	// || 3000;

app.use(fileUpload());	// Without this, req.files will be null in app.post('/', function (req, res) { ... }

app.get('/', function (req, res) {
	console.log('GET /');
	// res.sendFile(__dirname + '/index.html'); // TW TODO: Use path.join
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', function (req, res) {
	console.log('POST /');
	//console.log('req.files is', req.files);

	if (!req.files) {
		console.error('req.files is null.');
		res.status(500).send('req.files is null.');
	} else if (!req.files.file) {
		console.error('req.files.file is null.');
		res.status(500).send('req.files.file is null.');
	} else {
		// TODO: If the directory __dirname + '/uploads does not exist, create it.
		let fileObject = req.files.file;
		// var destPath = __dirname + '/uploads/' + fileObject.name;
		var destPath = path.join(__dirname, 'uploads', fileObject.name);

		fs.writeFile(destPath, fileObject.data, function (errorWriteFile) {

			if (errorWriteFile) {
				console.error('Error while saving uploaded file:', errorWriteFile);
				res.status(500).send('Error while saving uploaded file.');
			} else {
				console.log('Uploaded file successfully saved.');
				res.send('Uploaded file successfully saved.');
			}
		});
	}
});

app.get('/jquery.min.js', function (req, res) {
	// res.redirect('https://code.jquery.com/jquery-3.2.1.min.js');
	// res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
	res.sendFile(path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'));
});

app.get('/script.js', function (req, res) {
	// res.redirect('https://code.jquery.com/jquery-3.2.1.min.js');
	// res.sendFile(__dirname + '/script.js');
	res.sendFile(path.join(__dirname, 'script.js'));
});

// Start the server:

var server = app.listen(serverListenPort, function () {
	let host = server.address().address;

	if (host === '::') {
		host = 'localhost';
	}

	console.log('The Express.js server is listening at http://%s:%s (protocol %s)', host, server.address().port, server.address().family);
});

module.exports = server;

// End of File.
