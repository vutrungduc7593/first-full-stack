'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
    name: { type: String, required: true },
    address: String,
    phone: String,
    email: String
});

module.exports = mongoose.model('Restaurant', Restaurant);