// test/sample_test.js

// Original test code from https://mochajs.org/#getting-started :

// var assert = require('assert');

// describe('Array', function() {
//	   describe('#indexOf()', function() {
//		   it('should return -1 when the value is not present', function() {
//			 assert.equal(-1, [1,2,3].indexOf(4));
//		   });
//	   });
// });

// Modified to pass lint:

var assert = require('assert');

describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal(-1, [1, 2, 3].indexOf(4));
		});
	});
});

// From https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/ :

// The Express server being tested could look like this:

// var express = require('express');
// var app = express();
// app.get('/', function (req, res) {
// 	res.status(200).send('ok');
// });
// var server = app.listen(3000, function () {
// 	var port = server.address().port;
// 	console.log('Example app listening at port %s', port);
// });
// module.exports = server;

var request = require('supertest');
var require = require('really-need');

describe('Loading Express', function () {
	var server; // let?

	beforeEach(function () {
		server = require('../server', { bustCache: true });
	});

	afterEach(function (done) {
		server.close(done);
	});

	it('responds to /', function (done) {
		request(server)
			.get('/')
			.expect(200, done);
	});

	it('404 everything else', function (done) {
		console.log('test 404');
		request(server)
			.get('/foo/bar')
			.expect(404, done);
	});
});

// A sample testing run:	

// $ mocha -R spec spec.js 
  // loading express
// Example app listening at port 3000
    // ✓ responds to / 
// Example app listening at port 3000
    // ✓ 404 everything else 
  // 2 passing (121ms)
