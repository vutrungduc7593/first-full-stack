'use strict';

var superagent = require('superagent');
var expect = require('expect.js');

describe('Unit test Table Model', function() {
	var ids = [];
	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
	var authorizationHeader = 'Basic: ' + encodedData;
	//var endpoint = 'https://meal-order-vd.herokuapp.com';
	var endpoint = 'http://localhost:8080';
	var apiKey = 'AIzaSyAYT4HQPy9v1J_aAiOrBllVR-5fjAfqqf8';
	var token = 'cpVIcZr8ptQ:APA91bFhP1T1BNU7eKSQgKfza-ZZXkI_tAsL1jw5fUPUFtgCgF4Y6iHhzw6mQHuOGKw1FRhxIQm23BttRxb_minf3RIoX6W3Xaf6fBEWkKNtYXEJL6fdBrIwZElQaiFgo_FwlJADKb2d';
	
	it('push notification to topic', function(done) {
	   superagent.post('https://android.googleapis.com/gcm/send')
	   		.set('Content-Type', 'application/json')
	   		.set('Authorization', 'key=' + apiKey)
	   		.send({
	   			to: '/topics/global',
	   			data: {
	   				message: 'SLucis: Hello To Topic!'
	   			}
	   		})
	   		.end(function (e, res) {
	   			expect(e).to.eql(null);
	   			expect(res.status).to.eql(200);
	   			done();
	   		});
	});
	
	it('push notification to token', function(done) {
	   superagent.post('https://android.googleapis.com/gcm/send')
	   		.set('Content-Type', 'application/json')
	   		.set('Authorization', 'key=' + apiKey)
	   		.send({
	   			to: token,
	   			data: {
	   				message: 'SLucis: Hello To Mine!'
	   			}
	   		})
	   		.end(function (e, res) {
	   			expect(e).to.eql(null);
	   			expect(res.status).to.eql(200);
	   			
	   			console.log(res.body);
	   			done();
	   		});
	});
	
	it('register #1', function(done) {
		superagent.post(endpoint + '/api/gcm/register')
			.set('Authorization', authorizationHeader)
			.send({
			    "gcmId": "1"
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).not.to.eql(null);
				ids[0] = res.body.data;
				done();
			});
	});
	
	it('register #2', function(done) {
		superagent.post(endpoint + '/api/gcm/register')
			.set('Authorization', authorizationHeader)
			.send({
			    "gcmId": "2"
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).not.to.eql(null);
				ids[1] = res.body.data;
				done();
			});
	});
	
	it('register #3', function(done) {
		superagent.post(endpoint + '/api/gcm/register')
			.set('Authorization', authorizationHeader)
			.send({
			    "gcmId": "3"
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).not.to.eql(null);
				ids[2] = res.body.data;
				done();
			});
	});
	
	it('register #4 - duplicate gcmId, should return existed id', function(done) {
		superagent.post(endpoint + '/api/gcm/register')
			.set('Authorization', authorizationHeader)
			.send({
			    "gcmId": "3"
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).not.to.eql(null);
				
				expect(res.body.data).to.eql(ids[2]); 
				
				done();
			});
	});
	
	it('Get all users', function(done) {
		superagent.get(endpoint + '/api/users')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).not.to.eql(null);
				expect(res.body.data.length).to.eql(4);
				done();
			});
	});
	
	it('push notification #3 - should return 2 success (except #3)', function(done) {
		superagent.post(endpoint + '/api/gcm/push')
			.set('Authorization', authorizationHeader)
			.send({
			    "gcmId": "3"
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).not.to.eql(null);
				expect(res.body.data).to.eql(2);
				done();
			});
	});

	it('unregister #1', function(done) {
		superagent.post(endpoint + '/api/gcm/unregister')
			.set('Authorization', authorizationHeader)
			.send({
			    "gcmId": "1"
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).to.eql(1);
				done();
			});
	});
	
	it('unregister #2', function(done) {
		superagent.post(endpoint + '/api/gcm/unregister')
			.set('Authorization', authorizationHeader)
			.send({
			    "gcmId": "2"
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).to.eql(1);
				done();
			});
	});
	
	it('unregister #3', function(done) {
		superagent.post(endpoint + '/api/gcm/unregister')
			.set('Authorization', authorizationHeader)
			.send({
			    "gcmId": "3"
			})
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.data).to.eql(1);
				done();
			});
	});
})