'use strict';

var superagent = require('superagent');
var expect = require('expect.js');
var Category = require('../../app/models/categories.js');

describe('Unit test Category Model', function() {
	var id;
	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
	var authorizationHeader = 'Basic: ' + encodedData;
	var endPoint = 'http://localhost:8080';
	
	var category = new Category();
	category._id = 'Food';

	it('add category', function(done) {
		superagent.post(endPoint + '/api/categories')
			.set('Authorization', authorizationHeader)
			.send(category)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Add new category');
				expect(res.body.data).not.to.eql(null);
				id = res.body.data;
				done();
			});
	});

	it('get all categories', function(done) {
		superagent.get(endPoint + '/api/categories')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of categories');
				expect(res.body.data.length).to.above(0);
				done();
			});
	});

	it('get category', function(done) {
		superagent.get(endPoint + '/api/categories/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get category');
				expect(res.body.data._id).to.eql(id);
				done();
			});
	});

	it('update category', function(done) {
	
		// category.name = 'Updated';
	
		superagent.put(endPoint + '/api/categories/' + id)
			.set('Authorization', authorizationHeader)
			.send(category)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Update category');
				expect(res.body.data).to.eql(id);
				done();
			});
	});


	it('check update category', function(done) {
		superagent.get(endPoint + '/api/categories/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get category');
				expect(res.body.data._id).to.eql(id);
				// expect(res.body.data.name).to.eql('Updated');
				done();
			});
	});

	it('delete category', function(done) {
		superagent.del(endPoint + '/api/categories/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Delete category');
				expect(res.body.data).to.eql(1);
				done();
			});
	});
})