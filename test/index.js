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
	it('get all foods', function(done) {
		superagent.get('http://localhost:8080/api/foods?api_key=9b4c95e0122ee91892a9de5ae3fb2cef')
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
	            expect(res.body.message).to.eql('Get list of foods');
	            expect(res.body.data.length).to.above(0);
				done();
			});
	});
	
	it('get some foods by like %name%, sort name DESC', function(done) {
		superagent.get('http://localhost:8080/api/foods?api_key=9b4c95e0122ee91892a9de5ae3fb2cef&name=th&sort=-name')
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
	            expect(res.body.message).to.eql('Get list of foods');
	            expect(res.body.data.length).to.above(0);
	            expect(res.body.data[0].name).to.eql('Thịt xay'); // may not true if db change
				done();
			});
	});
	
	var id;
	
	it('add food', function(done) {
		superagent.post('http://localhost:8080/api/foods')
			.send({
				api_key: '9b4c95e0122ee91892a9de5ae3fb2cef',
				data: {
					name: 'Gà đông cô',
					type: 'Gà',
					price: 100,
					note: 'Very tasty'
				}
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
	            expect(res.body.message).to.eql('Add new food');
	            expect(res.body.data).not.to.eql(null);
	            expect(res.body.data.note).to.eql(undefined);
	            id = res.body.data;
				done();
			});
	});
	
	it('add food error', function(done) {
		superagent.post('http://localhost:8080/api/foods')
			.send({
				api_key: '9b4c95e0122ee91892a9de5ae3fb2cef',
				data: {
					name: null,
					type: 'Gà',
					price: 100
				}
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('ERROR');
	            expect(res.body.message).to.eql('ValidationError: Path `name` is required.');
	            expect(res.body.data).to.eql(null);
				done();
			});
	});
	
	it('get food', function(done) {
		superagent.get('http://localhost:8080/api/foods/' + id + '?api_key=9b4c95e0122ee91892a9de5ae3fb2cef')
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
	            expect(res.body.message).to.eql('Get food');
	            expect(res.body.data._id.length).to.eql(24);
	            expect(res.body.data._id).to.eql(id);
				done();
			});
	});
	
	it('update food', function(done) {
		superagent.put('http://localhost:8080/api/foods/' + id)
			.send({
				api_key: '9b4c95e0122ee91892a9de5ae3fb2cef',
				data: {
					name: 'Gà rang',
					type: 'Món Gà',
					price: 175
				}
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
	            expect(res.body.message).to.eql('Update food');
	            expect(res.body.data.length).to.eql(24);
	            expect(res.body.data).to.eql(id);
				done();
			});
	});
	
	
	it('check update food', function(done) {
		superagent.get('http://localhost:8080/api/foods/' + id + '?api_key=9b4c95e0122ee91892a9de5ae3fb2cef')
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
	            expect(res.body.message).to.eql('Get food');
	            expect(res.body.data._id.length).to.eql(24);
	            expect(res.body.data._id).to.eql(id);
	            expect(res.body.data.name).to.eql('Gà rang');
	            expect(res.body.data.type).to.eql('Món Gà');
	            expect(res.body.data.price).to.eql(175);
				done();
			});
	});
	
	it('delete food', function(done) {
		superagent.del('http://localhost:8080/api/foods/' + id + '?api_key=9b4c95e0122ee91892a9de5ae3fb2cef')
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
	            expect(res.body.message).to.eql('Delete food');
	            expect(res.body.data).to.eql(1);
				done();
			});
	});
	
})