'use strict';

var Permissions = require('../models/permissions.js');
var HandleRes = require('../common/handleRes.js');

function PermissionHandler() {
    
    var handleRes = new HandleRes();

    this.getPermissions = function(req, res) {
    
        // var pRange = req.query.price ? req.query.price.split(',') : '';
    
        Permissions
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
                    handleRes.send(res, 'Get list of permissions', result);
                } else {
                    handleRes.error(res, new Error('Not found permissions'));
                }
                
            });
    };

    this.getPermission = function(req, res) {
        Permissions
            .findOne({_id: req.params.id})
            .limit(req.query.limit ? Number(req.query.limit) : 10)
            .sort(req.query.sort ? req.query.sort.replace(',', ' ') : null)
            .select(req.query.select ? req.query.select.replace(',', ' ') : null)
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                
                if (result) {
                    handleRes.send(res, 'Get permission', result);
                } else {
                    handleRes.error(res, new Error('Not found permission'));
                }
                
            });
    };

    this.addPermission = function(req, res) {
        Permissions
            .create(req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                
                if (result) {
                    handleRes.send(res, 'Add new permission', result._id);
                } else {
                    handleRes.error(res, new Error('Unable add permission'));
                }
                
            });
    };

    this.updatePermission = function(req, res) {
        Permissions
            .findOneAndUpdate({ _id: req.params.id }, req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                
                if (result) {
                    handleRes.send(res, 'Update permission', result._id);
                } else {
                    handleRes.error(res, new Error('Unable update permission'));
                }
                
            });
    };

    this.deletePermission = function(req, res) {
        Permissions
            .remove({ _id: req.params.id }, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Delete permission', result.result.n);
            });
    };

}

module.exports = PermissionHandler;