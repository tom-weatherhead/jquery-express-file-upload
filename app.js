// jquery-express-file-upload/app.js

// require('rootpath')();

const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(fileUpload());	// Without this, req.files will be null in app.post('/', function (req, res) { ... }

app.get('/', function (req, res) {
	console.log('GET /');
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', function (req, res) {
	console.log('POST /');

	if (!req.files) {
		console.error('req.files is null.');
		res.status(500).send('req.files is null.');
	} else if (!req.files.file) {
		console.error('req.files.file is null.');
		res.status(500).send('req.files.file is null.');
	} else {
		// TODO: If the directory __dirname + '/uploads does not exist, create it.
		let fileObject = req.files.file;
		var destPath = path.join(__dirname, 'uploads', fileObject.name);

		fs.writeFile(destPath, fileObject.data, function (errorWriteFile) {

			if (errorWriteFile) {
				console.error('Error while saving uploaded file:', errorWriteFile);
				res.status(500).send('Error while saving uploaded file.');
			} else {
				console.log('Uploaded file successfully saved.');
				res.status(201).send('Uploaded file successfully saved.');
			}
		});
	}
});

app.get('/teapot', function (req, res) {
	// See https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
	// See https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol
	// See https://httpstatuses.com/418
	// See https://stackoverflow.com/questions/24018008/is-there-a-server-that-implements-http-status-code-418
	// See especially https://www.google.com/teapot
	console.log('GET /teapot : Responding with HTTP status code 418...');
	res.sendStatus(418);
	// Or res.status(418).send('The teapot is responding to the request to brew coffee...');
});

app.get('/jquery.min.js', function (req, res) {
	// res.redirect('https://code.jquery.com/jquery-3.2.1.min.js');
	res.sendFile(path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'));
});

app.get('/script.js', function (req, res) {
	res.sendFile(path.join(__dirname, 'script.js'));
});

module.exports = app;

// End of File.
