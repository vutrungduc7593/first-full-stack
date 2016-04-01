'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Food = new Schema({
    name: { type: String, required: true },
    _category: { type: String, ref: 'Category', default: 'Food' },
    image: String,
    price: { type: Number, default: 75 }
});

module.exports = mongoose.model('Food', Food);