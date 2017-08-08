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
