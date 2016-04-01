'use strict';

var Categories = require('../models/categories.js');
var HandleRes = require('../common/handleRes.js');

function CategoryHandler() {
    
    var handleRes = new HandleRes();

    this.getCategories = function(req, res) {
    
        // var pRange = req.query.price ? req.query.price.split(',') : '';
    
        Categories
            .find({
                // name: new RegExp(req.query.name, 'i'),
                // price: {
                //     $gt: pRange[0] ? Number(pRange[0]) : Number.MIN_VALUE,
                //     $lt: pRange[1] ? Number(pRange[1]) : Number.MAX_VALUE
                // }
            })
            .limit(Number(req.query.limit))
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : '')
            .select(req.query.select ? req.query.select.replace(',', ' ') : '')
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get list of categories', result);
            });
    };

    this.getCategory = function(req, res) {
        Categories
            .findOne({_id: req.params.id})
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get category', result);
            });
    };

    this.addCategory = function(req, res) {
        Categories
            .create(req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Add new category', result._id);
            });
    };

    this.updateCategory = function(req, res) {
        Categories
            .findOneAndUpdate({ _id: req.params.id }, req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Update category', result._id);
            });
    };

    this.deleteCategory = function(req, res) {
        Categories
            .remove({ _id: req.params.id }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Delete category', result.result.n);
            });
    };

}

module.exports = CategoryHandler;