'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Table = new Schema({
    _id: { type: Number, required: true, unique: true }
});

module.exports = mongoose.model('Table', Table);