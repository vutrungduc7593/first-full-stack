'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/localdb');

var db = mongoose.connection;
var path = process.cwd();

var Orders = require(path + '/app/models/orders.js');
var Foods = require(path + '/app/models/foods.js');

var addOrderData = function() {
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

                order._food = foodIds[Math.floor(Math.random() * (foodIds.length - 1))];
                order.quantity = Math.floor(Math.random() * 3) + 1;
                order.note = '';

                orders.push(order);
            }

            Orders.create(orders, function(err, result) {
                if (err) return console.error(err);
                console.log('Saved ' + result.length + ' items');
            });
        });
};

var addFoodData = function() {
    Foods
        .create([{ name: "Chicken", category: "Food", price: 3.50 }, { name: "Coca Cola", category: "Drink", price: 1.00 }], function(err, result) {
            if (err) return console.log(err);
            console.log('Saved ' + result);
        });
};

db.on('open', function() {
    addFoodData();

    // Orders.find({})
    //     .sort('_table -created_at')
    //     .select('_table created_at')
    //     .exec(function (err, result) {
    //         if (err) return;
    //         console.log(result);
    //     });

    // Orders.update({
    //     _id: '56f66c5d275425df0a3d87e7'
    // }, {
    //     paid: false
    // }, function(err, result) {
    //     if (err) return console.error(err);
    //     console.log(result);
    // });

});