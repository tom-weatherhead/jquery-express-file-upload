// test/server_spec.js

// !!! TODO: Use chai and chai-http. See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html and our repo test-express-mocha-chai-perello

// ****

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

// var assert = require('assert');

// describe('Array', function () {
	// describe('#indexOf()', function () {
		// it('should return -1 when the value is not present', function () {
			// assert.equal(-1, [1, 2, 3].indexOf(4));
		// });
	// });
// });

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

// var request = require('supertest');
// var require = require('really-need');

// describe('Loading Express', function () {
	// var server; // let?

	// beforeEach(function () {
		// server = require('../server', { bustCache: true });
	// });

	// afterEach(function (done) {
		// server.close(done);
	// });

	// it('responds to /', function (done) {
		// request(server)
			// .get('/')
			// .expect(200, done);
	// });

	// it('404 everything else', function (done) {
		// console.log('test 404');
		// request(server)
			// .get('/foo/bar')
			// .expect(404, done);
	// });
// });

// A sample testing run:	

// $ mocha -R spec spec.js 
  // loading express
// Example app listening at port 3000
    // ✓ responds to / 
// Example app listening at port 3000
    // ✓ 404 everything else 
  // 2 passing (121ms)

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', function() {
	describe('/set?somekey=somevalue', function() {
		it('responds with status 200', function(done) {
			chai.request(app)
				.post('/set?somekey=somevalue')
				.end(function(err, res) {
					expect(res).to.have.status(200);
					done();
				});
		});
	});

	describe('/get', function() {
		it('responds with status 200', function(done) {
			chai.request(app)
				.post('/set?somekey=somevalue')
				.then(function() {
					chai.request(app)
						.get('/get?key=somekey')
						.end(function(err, res) {
							expect(res).to.have.status(200);
							expect(res.text).to.equal('somevalue');
							done();
						});
				});
		});
	});
});
