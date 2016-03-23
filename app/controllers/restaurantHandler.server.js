'use strict';

var Restaurants = require('../models/restaurants.js');
var HandleRes = require('../common/handleRes.js');

function RestaurantHandler() {
    
    var handleRes = new HandleRes();

    this.getDocs = function(req, res) {
        Restaurants
            .find({
                name: new RegExp(req.query.name, 'i')
            })
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get list of restaurants', result);
            });
    };

    this.getDoc = function(req, res) {
        Restaurants
            .findOne({_id: req.params.id})
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get restaurant', result);
            });
    };

    this.addDoc = function(req, res) {
        Restaurants
            .create(req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Add new restaurant', result._id);
            });
    };

    this.updateDoc = function(req, res) {
        Restaurants
            .findOneAndUpdate({ _id: req.params.id }, req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Update restaurant', result._id);
            });
    };

    this.deleteDoc = function(req, res) {
        Restaurants
            .remove({ _id: req.params.id }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Delete restaurant', result.result.n);
            });
    };

}

module.exports = RestaurantHandler;