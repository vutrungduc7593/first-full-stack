'use strict';

var Roles = require('../models/roles.js');
var HandleRes = require('../common/handleRes.js');

function RoleHandler() {
    
    var handleRes = new HandleRes();

    this.getRoles = function(req, res) {
    
        // var pRange = req.query.price ? req.query.price.split(',') : '';
    
        Roles
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
                
                if (result) {
                    handleRes.send(res, 'Get list of roles', result);
                } else {
                    handleRes.error(res, new Error('Not found roles'));
                }
                
            });
    };

    this.getRole = function(req, res) {
        Roles
            .findOne({_id: req.params.id})
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                
                if (result) {
                    handleRes.send(res, 'Get role', result);
                } else {
                    handleRes.error(res, new Error('Not found role'));
                }
                
            });
    };

    this.addRole = function(req, res) {
        Roles
            .create(req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                
                if (result) {
                    handleRes.send(res, 'Add new role', result._id);
                } else {
                    handleRes.error(res, new Error('Unable add role'));
                }
                
            });
    };

    this.updateRole = function(req, res) {
        Roles
            .findOneAndUpdate({ _id: req.params.id }, req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                
                if (result) {
                    handleRes.send(res, 'Update role', result._id);
                } else {
                    handleRes.error(res, new Error('Unable update role'));
                }
                
            });
    };

    this.deleteRole = function(req, res) {
        Roles
            .remove({ _id: req.params.id }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Delete role', result.result.n);
            });
    };

}

module.exports = RoleHandler;