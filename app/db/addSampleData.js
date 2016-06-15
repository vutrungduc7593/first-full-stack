'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/localdb');

var db = mongoose.connection;
var path = process.cwd();

var Orders = require(path + '/app/models/orders.js');
var Foods = require(path + '/app/models/foods.js');
var Roles = require(path + '/app/models/roles.js');
var Users = require(path + '/app/models/users.js');

var addOrderData = function() {
    Foods.find({})
        .exec(function(err, result) {
            if (err) return console.error(err);

            var foodIds = result.map(function(val) {
                return val._id;
            });

            var orders = [];

            for (var i = 0; i < 2; i++) {
                var order = new Orders();
                order.paid = true;
                order._table = Math.floor(Math.random() * 10) + 1;

                order.items.push({
                    _food: foodIds[Math.floor(Math.random() * (foodIds.length - 1))],
                    quantity: Math.floor(Math.random() * 3) + 1,
                    note: 'Item 1'
                });

                order.items.push({
                    _food: foodIds[Math.floor(Math.random() * (foodIds.length - 1))],
                    quantity: Math.floor(Math.random() * 3) + 1,
                    note: 'Item 2'
                });

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
        .create([{
            name: "Chicken",
            category: "Food",
            price: 3.50
        }, {
            name: "Coca Cola",
            category: "Drink",
            price: 1.00
        }], function(err, result) {
            if (err) return console.log(err);
            console.log('Saved ' + result);
        });
};

var addRoleData = function () {
    Roles.create([{
        name: "Admin"
    }, {
        name: "Waiter"
    }, {
        name: "Chef"
    }], function (err, result) {
        if (err) return console.log(err);
        console.log('Saved ' + result);
    });
};

var addUserData = function () {
    Users.create([{
        username: "admin",
        password: "0192023a7bbd73250516f069df18b500", // admin123
        _role: "5734a99691aaa37714fee941"
    }, {
        username: "waiter",
        password: "e82d611b52164e7474fd1f3b6d2c68db", // waiter123
        _role: "5734a99691aaa37714fee942"
    }, {
        username: "chef",
        password: "677dbf3b047f16c7c5b5554a8259f2eb", // chef123
        _role: "5734a99691aaa37714fee943"
    }], function (err, result) {
        if (err) return console.log(err);
        console.log('Saved ' + result);
    });
};

db.on('open', function() {
    // addFoodData();
    // addOrderData();
    // addRoleData();
    addUserData();

    // var chickenFood = '56fde5dd1c72737a16033a23';

    // Foods
    //     .findOneAndUpdate({
    //         _id: chickenFood
    //     }, {
    //         category: 'Food'
    //     }, function(err, result) {
    //         if (err) return console.log(err);
    //         console.log(result);
    //     });
        
    // Foods
    //     .update({
    //         _id: chickenFood
    //     }, {
    //         category: 'Thit ga'
    //     }, function(err, result) {
    //         if (err) return console.log(err);
    //         console.log(result);
    //     });

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