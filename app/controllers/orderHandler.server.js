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
            .populate('items._food');

        if (req.query.table)
            builder.where('_table').equals(Number(req.query.table) ? Number(req.query.table) : 1);

        if (req.query.paid)
            builder.where('paid').equals(req.query.paid === 'true');

        builder.exec(function(err, result) {
            if (err) return handleRes.error(res, err);
            handleRes.send(res, 'Get list of orders', result);
        });
    };

    this.payOrders = function(req, res) {
        Orders
            .update({
                _id: {
                    $in: req.body.ids
                }
            }, {
                paid: true
            }, {
                multi: true
            }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Paid orders', result.nModified);
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
            .populate('items._food')
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

                result.populate('items._food', function(err, populatedOrder) {
                    if (err) return console.error(err);
                    gcmHandler.emit('NEW_ORDER', populatedOrder);
                    
                    handleRes.send(res, 'Add new order', populatedOrder);
                });
            });
    };

    this.payOrder = function(req, res) {

        Orders
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                paid: true
            }, function(err, result) {
                if (err) return handleRes.error(res, err);

                if (result) {
                    gcmHandler.emit('PAY_ORDER', result._id);
                    handleRes.send(res, 'Paid order', result._id);
                }
                else {
                    handleRes.error(res, new Error('Not found order'));
                }
            });
    };

    this.updateDoc = function(req, res) {
        Orders
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body, function(err, result) {
                if (err) return handleRes.error(res, err);

                if (result) {
                    Orders
                        .findOne({
                            _id: result._id
                        })
                        .populate('items._food')
                        .exec(function(err, result) {
                            if (err) return handleRes.error(res, err);

                            gcmHandler.emit('UPDATE_ORDER', result);
                        });

                    handleRes.send(res, 'Update order', result._id);
                }
                else {
                    handleRes.error(res, new Error("Unable update Order"));
                }
            });
    };

    this.deleteDoc = function(req, res) {
        Orders
            .remove({
                _id: req.params.id
            }, function(err, result) {
                if (err) return handleRes.error(res, err);
                
                if (result.result.n >= 1) {
                    gcmHandler.emit('DELETE_ORDER', req.params.id);
                }
                
                handleRes.send(res, 'Delete order', result.result.n);
            });
    };

}

module.exports = OrderHandler;