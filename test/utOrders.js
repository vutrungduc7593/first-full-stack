var superagent = require('superagent');
var expect = require('expect.js');
var Order = require('../app/models/orders.js');

describe('Unit test Order Model', function() {
	var id;
	var encodedData;
	var authorizationHeader;
	var order;

	before(function() {
		encodedData = new Buffer('23032016:apikey23032016').toString('base64');
		authorizationHeader = 'Basic: ' + encodedData;

		order = new Order();
		order._table = 1;

		order.items.push({
			food: '56f2aacf417e29e42a58524f',
			note: 'No spicy'
		});
	});

	it('add order', function(done) {
		superagent.post('http://localhost:8080/api/orders')
			.set('Authorization', authorizationHeader)
			.send(order)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Add new order');
				expect(res.body.data).not.to.eql(null);
				id = res.body.data;
				done();
			});
	});

	it('get all orders', function(done) {
		superagent.get('http://localhost:8080/api/orders')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of orders');
				expect(res.body.data.length).to.above(0);
				done();
			});
	});

	it('get order', function(done) {
		superagent.get('http://localhost:8080/api/orders/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get order');
				expect(res.body.data._id.length).to.eql(24);
				expect(res.body.data._id).to.eql(id);
				expect(res.body.data._table).to.eql(1);
				expect(res.body.data.items.length).to.above(0);
				expect(res.body.data.items[0]._id.length).to.eql(24);
				expect(res.body.data.items[0].food.length).to.eql(24);
				expect(res.body.data.items[0].note).to.eql('No spicy');
				expect(res.body.data.created_at).not.to.eql(undefined);
				expect(res.body.data.items[0].quantity).to.eql(1);

				done();
			});
	});

	it('update order', function(done) {
		order.paid = true;
		order.items[0].note = 'Updated';
		
		superagent.put('http://localhost:8080/api/orders/' + id)
			.set('Authorization', authorizationHeader)
			.send(order)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Update order');
				expect(res.body.data.length).to.eql(24);
				expect(res.body.data).to.eql(id);
				done();
			});
	});


	it('check update order', function(done) {
		superagent.get('http://localhost:8080/api/orders/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get order');
				expect(res.body.data._id.length).to.eql(24);
				expect(res.body.data._id).to.eql(id);
				expect(res.body.data.paid).to.eql(true);
				expect(res.body.data.items[0].note).to.eql('Updated');
				done();
			});
	});

	it('delete order', function(done) {
		superagent.del('http://localhost:8080/api/orders/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Delete order');
				expect(res.body.data).to.eql(1);
				done();
			});
	});

});