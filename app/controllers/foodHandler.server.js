'use strict';

var Foods = require('../models/foods.js');
var HandleRes = require('../common/handleRes.js');

function FoodHandler() {
    
    var handleRes = new HandleRes();

    this.getFoods = function(req, res) {
        Foods
            .find({
                name: new RegExp(req.query.name, 'i')
            })
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get list of foods', result);
            });
    };

    this.getFood = function(req, res) {
        Foods
            .findOne({_id: req.params.id})
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get food', result);
            });
    };

    this.addFood = function(req, res) {
        Foods
            .create(req.body.data, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Add new food', result._id);
            });
    };

    this.updateFood = function(req, res) {
        Foods
            .findOneAndUpdate({ _id: req.params.id }, { $set: req.body.data }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Update food', result._id);
            });
    };

    this.deleteFood = function(req, res) {
        Foods
            .remove({ _id: req.params.id }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Delete food', result.result.n);
            });
    };

}

module.exports = FoodHandler;