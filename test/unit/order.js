var superagent = require('superagent');
var expect = require('expect.js');
var Order = require('../../app/models/orders.js');

describe('Unit test Order Model', function() {
	var id;
	var encodedData;
	var authorizationHeader;
	var order;
	var end_point = 'http://localhost:8080';
	var chickenFood = '56fde5dd1c72737a16033a23';
	var cocaDrink = '56fde5dd1c72737a16033a24';

	before(function() {
		encodedData = new Buffer('23032016:apikey23032016').toString('base64');
		authorizationHeader = 'Basic: ' + encodedData;

		order = new Order();
		order._table = 1;

		order.items.push({
			_food: chickenFood,
			note: 'No spicy'
		});
	});

	it('add order', function(done) {
		superagent.post(end_point + '/api/orders')
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
		superagent.get(end_point + '/api/orders')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of orders');
				expect(res.body.data.length).to.above(0);
				
				for (var i = 0, len = res.body.data; i < len; i++) {
					var order = res.body.data[i];
					
					expect(order.items.length).to.above(0);
					
					var orderItem = order.items[0];
					
					expect(orderItem.quantity).to.above(0);
					expect(typeof orderItem._food).to.eql('object');
					expect(orderItem._food._id.length).to.eql(24);
					expect(orderItem._food.price).to.above(0);
				}
				
				done();
			});
	});

	// Tested cases: no paid, paid=true, paid=false
	
	it('get current orders of table', function(done) {
		superagent.get(end_point + '/api/orders?table=1&paid=false')
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get list of orders');
				
				expect(res.body.data.length).to.above(0);
				
				expect(res.body.data[0]._id).to.above(0);
				
				expect();
				
				expect(res.body.data[0].items.length).to.above(0);
				
				expect(typeof res.body.data[0].items[0]._food).to.eql('object');
				expect(res.body.data[0].items[0]._food._id.length).to.eql(24);
				expect(res.body.data[0].items[0]._food.name).not.to.eql(undefined);
				expect(res.body.data[0].items[0]._food.price).to.above(0);
				
				expect(res.body.data[0].items[0].quantity).to.above(0);
				
				done();
			});
	});

	it('get order', function(done) {
		superagent.get(end_point + '/api/orders/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get order');
				
				expect(res.body.data._id).to.above(0);
				expect(res.body.data._id).to.eql(id);
				
				expect(res.body.data._table).to.eql(1);
				
				expect(typeof res.body.data.items[0]._food).to.eql('object');
				expect(res.body.data.items[0]._food._id.length).to.eql(24);
				expect(res.body.data.items[0]._food._id).to.eql(chickenFood);
				
				expect(res.body.data.items[0].note).to.eql('No spicy');
				
				expect(res.body.data.created_at).not.to.eql(undefined);
				
				expect(res.body.data.items[0].quantity).to.eql(1);

				done();
			});
	});

	it('update order - table, paid, note, item[0]', function(done) {
		order.paid = true;
		order._table = 2;
		order.items[0].note = 'Updated';
		order.items[0]._food = cocaDrink;
		
		superagent.put(end_point + '/api/orders/' + id)
			.set('Authorization', authorizationHeader)
			.send(order)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Update order');
				expect(res.body.data).to.above(0);
				expect(res.body.data).to.eql(id);
				done();
			});
	});

	it('check update order', function(done) {
		superagent.get(end_point + '/api/orders/' + id)
			.set('Authorization', authorizationHeader)
			.end(function(e, res) {
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.status).to.eql('OK');
				expect(res.body.message).to.eql('Get order');
				
				expect(res.body.data._id).to.above(0);
				expect(res.body.data._id).to.eql(id);
				
				expect(res.body.data.created_at).not.to.eql(undefined);
				
				expect(res.body.data.paid).to.eql(true);
				
				expect(res.body.data._table).to.eql(2);
				
				expect(res.body.data.items[0].note).to.eql('Updated');
				expect(res.body.data.items[0].quantity).to.eql(1);
				
				expect(typeof res.body.data.items[0]._food).to.eql('object');
				expect(res.body.data.items[0]._food._id.length).to.eql(24);
				expect(res.body.data.items[0]._food._id).to.eql(cocaDrink);
				
				done();
			});
	});

	it('delete order', function(done) {
		superagent.del(end_point + '/api/orders/' + id)
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