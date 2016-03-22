'use strict';

var superagent = require('superagent');
var expect = require('expect.js');

describe('meal-order rest api server', function() {
	
	// Not auth
	it('add food not auth', function(done) {
		superagent.post('http://localhost:8080/api/foods')
			.send({
				api_key: 'invalid key'
			})
			.end(function(e, res) {
			    expect(e).not.to.be(null);
			    expect(res.status).to.be(401);
				done();
			});
	});
	
	// Auth
	it('get foods', function(done) {
		superagent.get('http://localhost:8080/api/foods?api_key=9b4c95e0122ee91892a9de5ae3fb2cef')
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('Ok');
	            expect(res.body.message).to.eql('Get list of foods');
				done();
			});
	});
	
	it('add food', function(done) {
		superagent.post('http://localhost:8080/api/foods')
			.send({
				api_key: '9b4c95e0122ee91892a9de5ae3fb2cef'
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('Ok');
	            expect(res.body.message).to.eql('Add new food');
				done();
			});
	});
	
	it('get food', function(done) {
		superagent.get('http://localhost:8080/api/foods/75?api_key=9b4c95e0122ee91892a9de5ae3fb2cef')
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('Ok');
	            expect(res.body.message).to.eql('Get food #75');
				done();
			});
	});
	
	it('update food', function(done) {
		superagent.put('http://localhost:8080/api/foods/75')
			.send({
				api_key: '9b4c95e0122ee91892a9de5ae3fb2cef'
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('Ok');
	            expect(res.body.message).to.eql('Update food #75');
				done();
			});
	});
	
	it('delete food', function(done) {
		superagent.del('http://localhost:8080/api/foods/75?api_key=9b4c95e0122ee91892a9de5ae3fb2cef')
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('Ok');
	            expect(res.body.message).to.eql('Delete food #75');
				done();
			});
	});
	
})