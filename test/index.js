// SAMPLE DATA

var superagent = require('superagent');
var expect = require('expect.js');

var Table = require('../app/models/tables.js');
// var Restaurant = require('../app/models/restaurants.js');

describe('Unit test Table Model', function() {
	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
	var authorizationHeader = 'Basic: ' + encodedData;
	
	var tables = [];
    for (var i = 0; i < 10; i++) {
        var table = new Table();
        table._id = i + 1;
        tables.push(table);
    }

	it('add table', function(done) {
		superagent.post('http://localhost:8080/api/tables')
			.set('Authorization', authorizationHeader)
			.send(tables)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Add new table');
				expect(res.body.data).not.to.eql(null);
				done();
			});
	});
});

// describe('test', function() {
//     it('add sample data', function(done) {
// 		superagent.get('http://localhost:8080/add/data')
// 			.end(function(e, res) {
// 				expect(e).to.be(null);
// 				expect(res.status).to.be(200);
// 				done();
// 			});
// 	});
// });

// describe('Unit test Restaurant Model', function() {
// 	var id;
// 	var encodedData = new Buffer('23032016:apikey23032016').toString('base64');
// 	var authorizationHeader = 'Basic: ' + encodedData;
	
// 	var restaurant = new Restaurant();
// 	restaurant.name = 'Quán ăn ngon';
// 	restaurant.address = 'Hà Nội';
// 	restaurant.phone = '0123456789';
// 	restaurant.email = 'quananngon123@gmail.com';

// 	it('add restaurant', function(done) {
// 		superagent.post('http://localhost:8080/api/restaurants')
// 			.set('Authorization', authorizationHeader)
// 			.send(restaurant)
// 			.end(function(e, res) {
// 				expect(e).to.eql(null);
// 				expect(typeof res.body).to.eql('object');
// 				expect(res.body.status).to.eql('OK');
// 				expect(res.body.message).to.eql('Add new restaurant');
// 				expect(res.body.data).not.to.eql(null);
// 				id = res.body.data;
// 				done();
// 			});
// 	});
// });
