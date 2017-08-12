// jquery-express-file-upload/test/app_spec.js

// !!! TODO: Use chai and chai-http. See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html and our repo test-express-mocha-chai-perello

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', function() {
	// describe('/set?somekey=somevalue', function() {
		// it('responds with status 200', function(done) {
			// chai.request(app)
				// .post('/set?somekey=somevalue')
				// .end(function(err, res) {
					// expect(res).to.have.status(200);
					// done();
				// });
		// });
	// });

	// describe('/get', function() {
		// it('responds with status 200', function(done) {
			// chai.request(app)
				// .post('/set?somekey=somevalue')
				// .then(function() {
					// chai.request(app)
						// .get('/get?key=somekey')
						// .end(function(err, res) {
							// expect(res).to.have.status(200);
							// expect(res.text).to.equal('somevalue');
							// done();
						// });
				// });
		// });
	// });

	describe('/get', function() {
		it('responds with status 200', function(done) {
			chai.request(app)
				.get('/')
				.end(function(err, res) {
					// expect(err).to.be.null ???
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('/post', function() {
		it('responds with status 200', function(done) {
			const fs = require('fs');
			const nameOfFileToUpload = 'favicon.ico';

			chai.request(app)
				.post('/')
				.attach('file', fs.readFileSync(nameOfFileToUpload), nameOfFileToUpload)
				.end(function(err, res) {
					// expect(err).to.be.null ???
					expect(res).to.have.status(200);
					done();
				});
		});
	});
});
