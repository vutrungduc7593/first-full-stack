'use strict';

var superagent = require('superagent');
var expect = require('expect.js');
var Restaurant = require('../../app/models/restaurants.js');

describe('Unit test Restaurant Model', function() {
	var id;
	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
	var authorizationHeader = 'Basic: ' + encodedData;
	var end_point = 'http://meal-order-vd.herokuapp.com';
	
	var restaurant = new Restaurant();
	restaurant.name = 'Restaurant';

	it('add restaurant', function(done) {
		superagent.post(end_point + '/api/restaurants')
			.set('Authorization', authorizationHeader)
			.send(restaurant)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Add new restaurant');
				expect(res.body.data).not.to.eql(null);
				id = res.body.data;
				done();
			});
	});

	it('get all restaurants', function(done) {
		superagent.get(end_point + '/api/restaurants')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of restaurants');
				expect(res.body.data.length).to.above(0);
				done();
			});
	});

	it('get restaurant', function(done) {
		superagent.get(end_point + '/api/restaurants/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get restaurant');
				expect(res.body.data._id.length).to.eql(24);
				expect(res.body.data._id).to.eql(id);
				done();
			});
	});

	it('update restaurant', function(done) {
		
		restaurant.name = 'Updated';
		
		superagent.put(end_point + '/api/restaurants/' + id)
			.set('Authorization', authorizationHeader)
			.send(restaurant)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Update restaurant');
				expect(res.body.data.length).to.eql(24);
				expect(res.body.data).to.eql(id);
				done();
			});
	});


	it('check update restaurant', function(done) {
		superagent.get(end_point + '/api/restaurants/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get restaurant');
				expect(res.body.data._id.length).to.eql(24);
				expect(res.body.data._id).to.eql(id);
				expect(res.body.data.name).to.eql('Updated');
				done();
			});
	});

	it('delete restaurant', function(done) {
		superagent.del(end_point + '/api/restaurants/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Delete restaurant');
				expect(res.body.data).to.eql(1);
				done();
			});
	});
})