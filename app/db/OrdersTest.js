'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/localdb');

var db = mongoose.connection;
var path = process.cwd();

var Orders = require(path + '/app/models/orders.js');
var Foods = require(path + '/app/models/foods.js');

var addSampleData = function() {
    Foods.find({})
        .exec(function(err, result) {
            if (err) return console.error(err);

            var foodIds = result.map(function(val) {
                return val._id;
            });

            var orders = [];

            for (var i = 0; i < 10; i++) {
                var order = new Orders();
                order.paid = true;
                order._table = Math.floor(Math.random() * 10) + 1;
                order.items.push({
                    _food: foodIds[Math.floor(Math.random() * (foodIds.length - 1))],
                    quantity: Math.floor(Math.random() * 3) + 1,
                    note: ''
                });


                orders.push(order);
            }

            Orders.create(orders, function(err, result) {
                if (err) return console.error(err);
                console.log('Saved ' + result.length + ' items');
            });
        });
};

db.on('open', function() {
    // addSampleData();
    
    // Orders.find({})
    //     .sort('_table -created_at')
    //     .select('_table created_at')
    //     .exec(function (err, result) {
    //         if (err) return;
    //         console.log(result);
    //     });
    
    Orders.update({_id: '56f382c2f35c7898121d4866' }, {paid: false}, function (err, result) {
        if (err) return console.error(err);
        console.log(result);
    });

});