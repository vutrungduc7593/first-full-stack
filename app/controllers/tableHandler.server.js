'use strict';

var Tables = require('../models/tables.js');
var HandleRes = require('../common/handleRes.js');

function TableHandler() {
    
    var handleRes = new HandleRes();

    this.getDocs = function(req, res) {
        Tables
            .find({})
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get list of tables', result);
            });
    };

    this.getDoc = function(req, res) {
        Tables
            .findOne({_id: req.params.id})
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get table', result);
            });
    };

    this.addDoc = function(req, res) {
        Tables
            .create(req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Add new table', result._id);
            });
    };

    this.deleteDoc = function(req, res) {
        Tables
            .remove({ _id: req.params.id }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Delete table', result.result.n);
            });
    };

}

module.exports = TableHandler;