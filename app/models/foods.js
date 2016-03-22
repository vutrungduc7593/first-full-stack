'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Food = new Schema({
    name: { type: String, required: true },
    type: String,
    price: Number
});

module.exports = mongoose.model('Food', Food);