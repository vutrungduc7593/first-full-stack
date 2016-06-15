'use strict';

var superagent = require('superagent');
var expect = require('expect.js');
var Permission = require('../../app/models/permissions.js');

describe('Unit test Permission Model', function() {
	var id;
	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
	var authorizationHeader = 'Basic: ' + encodedData;
	var endPoint = 'http://localhost:8080';
	
	var permission = new Permission();

	it('add permission', function(done) {
		superagent.post(endPoint + '/api/permissions')
			.set('Authorization', authorizationHeader)
			.send(permission)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Add new permission');
				expect(res.body.data).not.to.eql(null);
				id = res.body.data;
				done();
			});
	});

	it('get all permissions', function(done) {
		superagent.get(endPoint + '/api/permissions')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of permissions');
				expect(res.body.data.length).to.above(0);
				done();
			});
	});

	it('get permission', function(done) {
		superagent.get(endPoint + '/api/permissions/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get permission');
				expect(res.body.data._id.length).to.eql(24);
				expect(res.body.data._id).to.eql(id);
				done();
			});
	});

	it('update permission', function(done) {
	
		// permission.name = 'Updated';
	
		superagent.put(endPoint + '/api/permissions/' + id)
			.set('Authorization', authorizationHeader)
			.send(permission)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Update permission');
				expect(res.body.data.length).to.eql(24);
				expect(res.body.data).to.eql(id);
				done();
			});
	});


	it('check update permission', function(done) {
		superagent.get(endPoint + '/api/permissions/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get permission');
				expect(res.body.data._id.length).to.eql(24);
				expect(res.body.data._id).to.eql(id);
				// expect(res.body.data.name).to.eql('Updated');
				done();
			});
	});

	it('delete permission', function(done) {
		superagent.del(endPoint + '/api/permissions/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Delete permission');
				expect(res.body.data).to.eql(1);
				done();
			});
	});
})