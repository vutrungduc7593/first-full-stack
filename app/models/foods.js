'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Food = new Schema({
    name: { type: String, required: true },
    type: String,
    image: String,
    price: { type: Number, default: 75 }
});

module.exports = mongoose.model('Food', Food);