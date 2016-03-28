'use strict';

var superagent = require('superagent');
var expect = require('expect.js');
var Table = require('../../app/models/tables.js');

describe('Unit test Table Model', function() {
	var id;
	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
	var authorizationHeader = 'Basic: ' + encodedData;
	var end_point = 'http://meal-order-vd.herokuapp.com';
	var table = new Table();

	it('add table', function(done) {
		
		table._id = 11;
		
		superagent.post(end_point + '/api/tables')
			.set('Authorization', authorizationHeader)
			.send(table)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Add new table');
				expect(res.body.data).not.to.eql(null);
				id = res.body.data;
				done();
			});
	});

	it('get all tables', function(done) {
		superagent.get(end_point + '/api/tables')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of tables');
				expect(res.body.data.length).to.above(0);
				done();
			});
	});

	it('get table', function(done) {
		superagent.get(end_point + '/api/tables/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get table');
				expect(res.body.data._id).to.eql(id);
				done();
			});
	});

	it('delete table', function(done) {
		superagent.del(end_point + '/api/tables/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Delete table');
				expect(res.body.data).to.eql(1);
				done();
			});
	});
})