'use strict';

var superagent = require('superagent');
var expect = require('expect.js');
var Role = require('../../app/models/roles.js');

describe('Unit test Role Model', function() {
	var id;
	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
	var authorizationHeader = 'Basic: ' + encodedData;
	var endPoint = 'http://localhost:8080';
	
	var role = new Role();

	it('add role', function(done) {
		superagent.post(endPoint + '/api/roles')
			.set('Authorization', authorizationHeader)
			.send(role)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Add new role');
				expect(res.body.data).not.to.eql(null);
				id = res.body.data;
				done();
			});
	});

	it('get all roles', function(done) {
		superagent.get(endPoint + '/api/roles')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of roles');
				expect(res.body.data.length).to.above(0);
				done();
			});
	});

	it('get role', function(done) {
		superagent.get(endPoint + '/api/roles/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get role');
				expect(res.body.data._id.length).to.eql(24);
				expect(res.body.data._id).to.eql(id);
				done();
			});
	});

	it('update role', function(done) {
	
		// role.name = 'Updated';
	
		superagent.put(endPoint + '/api/roles/' + id)
			.set('Authorization', authorizationHeader)
			.send(role)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Update role');
				expect(res.body.data.length).to.eql(24);
				expect(res.body.data).to.eql(id);
				done();
			});
	});


	it('check update role', function(done) {
		superagent.get(endPoint + '/api/roles/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get role');
				expect(res.body.data._id.length).to.eql(24);
				expect(res.body.data._id).to.eql(id);
				// expect(res.body.data.name).to.eql('Updated');
				done();
			});
	});

	it('delete role', function(done) {
		superagent.del(endPoint + '/api/roles/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Delete role');
				expect(res.body.data).to.eql(1);
				done();
			});
	});
})