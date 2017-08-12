// jquery-express-file-upload/test/app_spec.js

// Use chai and chai-http. See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html and our repo test-express-mocha-chai-perello

var chai = require('chai');
var chaiFiles = require('chai-files');
var chaiHttp = require('chai-http');
// const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

var app = require('../app');

chai.use(chaiFiles);
chai.use(chaiHttp);

var expect = chai.expect;
var file = chaiFiles.file;
//var dir = chaiFiles.dir;

describe('App', function() {
	
	after(function() {
		// With promises:
		fse.emptyDir('uploads')
			.then(() => {
				console.log('Empty the uploads directory: Success!');
			})
			.catch(err => {
				console.error('Empty the uploads directory: Error:', err);
			});
		// fs.delete('uploads/*');
		// fs.unlink('uploads/*', function(err) {
			// if (err) {
				// console.error('Error whiel unlinking (deleting) all files in uploads:', err);
			// } else {
				// console.log('file deleted');
			// }
		// });
	});

	describe('/get', function() {
		it('responds with status 200', function(done) {
			chai.request(app)
				.get('/')
				.end(function(err, res) {
					expect(err).to.be.null
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
			const destFilePath = path.join('uploads', nameOfFileToUpload);

			chai.request(app)
				.post('/')
				.attach('file', fs.readFileSync(nameOfFileToUpload), nameOfFileToUpload)
				.end(function(err, res) {
					expect(err).to.be.null;
					expect(res).to.have.status(201);
					expect(file(destFilePath)).to.equal(file(nameOfFileToUpload));
					fse.emptyDir('uploads')
						.then(() => {
							console.log('Empty the uploads directory: Success!');
							done();
						})
						.catch(err => {
							console.error('Empty the uploads directory: Error:', err);
							done();
						});
					// done();
					// TODO: Delete the uploaded copy of the file.
				});
		});
	});

	describe('/get teapot', function() {
		it('responds with status 200', function(done) {
			chai.request(app)
				.get('/teapot')
				.end(function(err, res) {
					expect(err).to.not.be.null
					expect(res).to.have.status(418);
					expect(res.text).to.equal('I\'m a teapot');
					done();
				});
		});
	});
});
