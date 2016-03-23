'use strict';

var Orders = require('../models/orders.js');
var HandleRes = require('../common/handleRes.js');

function FoodHandler() {
    
    var handleRes = new HandleRes();

    this.getDocs = function(req, res) {
        Orders
            .find({})
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get list of orders', result);
            });
    };

    this.getDoc = function(req, res) {
        Orders
            .findOne({_id: req.params.id})
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get order', result);
            });
    };

    this.addDoc = function(req, res) {
        Orders
            .create(req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Add new order', result._id);
            });
    };

    this.updateDoc = function(req, res) {
        Orders
            .findOneAndUpdate({ _id: req.params.id }, req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Update order', result._id);
            });
    };

    this.deleteDoc = function(req, res) {
        Orders
            .remove({ _id: req.params.id }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Delete order', result.result.n);
            });
    };

}

module.exports = FoodHandler;