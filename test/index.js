'use strict';

var superagent = require('superagent');
var expect = require('expect.js');

describe('meal-order rest api server', function() {

	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
	var authorizationHeader = 'Basic: ' + encodedData;

	/* JAVA
		byte[] bytes = "23032016:apikey23032016".getBytes();
		String encoded = Base64.getEncoder().encodeToString(bytes);
	    System.out.println(encoded);
	    
		byte[] decoded = Base64.getDecoder().decode(encoded);
	    System.out.println(new String(decoded));
	*/

	console.log(encodedData);

	// Not auth
	it('add food not auth', function(done) {
		superagent.post('http://localhost:8080/api/foods')
			.end(function(e, res) {
				expect(e).not.to.be(null);
				expect(res.status).to.be(401);
				done();
			});
	});

	// Auth
	var id;

	it('add food', function(done) {
		superagent.post('http://localhost:8080/api/foods')
			.set('Authorization', authorizationHeader)
			.send({
				name: 'Gà đông cô',
				type: 'Gà',
				price: 100,
				note: 'Very tasty'
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

	it('get all foods', function(done) {
		superagent.get('http://localhost:8080/api/foods')
			.set('Authorization', authorizationHeader)
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
		superagent.get('http://localhost:8080/api/foods?name=g&sort=-name')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of foods');
				expect(res.body.data.length).to.above(0);
				done();
			});
	});

	it('add food error', function(done) {
		superagent.post('http://localhost:8080/api/foods')
			.set('Authorization', authorizationHeader)
			.send({
				name: null,
				type: 'Gà',
				price: 100
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
		superagent.get('http://localhost:8080/api/foods/' + id)
			.set('Authorization', authorizationHeader)
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
			.set('Authorization', authorizationHeader)
			.send({
				name: 'Gà rang',
				type: 'Món Gà',
				price: 175
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
		superagent.get('http://localhost:8080/api/foods/' + id)
			.set('Authorization', authorizationHeader)
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
		superagent.del('http://localhost:8080/api/foods/' + id)
			.set('Authorization', authorizationHeader)
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