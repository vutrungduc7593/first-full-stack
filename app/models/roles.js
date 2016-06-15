'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role = new Schema({
    name: String,
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
});

module.exports = mongoose.model('Role', Role);
