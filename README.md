# jquery-express-file-upload

[![build status](https://secure.travis-ci.org/tom-weatherhead/jquery-express-file-upload.svg)](http://travis-ci.org/tom-weatherhead/jquery-express-file-upload)

A minimal example of a file upload Web application with a jQuery client and an Express.js server.

To download, install, and run this application:

	$ git clone https://github.com/tom-weatherhead/jquery-express-file-upload.git
	$ cd jquery-express-file-upload
	$ npm install -g grunt
	$ npm install
	$ npm start

Then load http://localhost:3000 in a Web browser.

The uploaded file(s) will be saved in this project's "uploads" directory.

To lint the JavaScript code, run one of the following command:

	$ npm run lint

or

	$ grunt eslint

To perform a static security analysis of the Node.js code using nsp:

	$ npm run nsp

or

	$ grunt nsp
