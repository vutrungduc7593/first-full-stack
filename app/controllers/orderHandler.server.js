'use strict';

var Orders = require('../models/orders.js');
var HandleRes = require('../common/handleRes.js');
var GcmHandler = require('./gcmHandler.server.js');

function OrderHandler() {

    var handleRes = new HandleRes();
    var gcmHandler = new GcmHandler();

    this.getDocs = function(req, res) {
        var builder = Orders
            .find({})
            .limit(req.query.limit ? Number(req.query.limit) : 50)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .populate('_food');

        if (req.query.table)
            builder.where('_table').equals(Number(req.query.table) ? Number(req.query.table) : 1);
        
        if (req.query.paid)
            builder.where('paid').equals(req.query.paid === 'true');

        builder.exec(function(err, result) {
            if (err) return handleRes.error(res, err);
            handleRes.send(res, 'Get list of orders', result);
        });
    };

    this.getDoc = function(req, res) {
        Orders
            .findOne({
                _id: req.params.id
            })
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .populate('_food')
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get order', result);
            });
    };

    this.addDoc = function(req, res) {
        Orders
            .create(req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                
                // No need wait to push success
                gcmHandler.pushNewOrder(result);
                
                handleRes.send(res, 'Add new order', result._id);
            });
    };

    this.updateDoc = function(req, res) {
        Orders
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Update order', result._id);
            });
    };

    this.deleteDoc = function(req, res) {
        Orders
            .remove({
                _id: req.params.id
            }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Delete order', result.result.n);
            });
    };

}

module.exports = OrderHandler;