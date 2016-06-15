'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Permission = new Schema({
    name: String
});

module.exports = mongoose.model('Permission', Permission);
