'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    _id: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Category', Category);
