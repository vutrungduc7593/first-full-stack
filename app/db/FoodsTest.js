'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/localdb');

var db = mongoose.connection;
var path = process.cwd();

var Foods = require(path + '/app/models/foods.js');
var limit; // get all if undefined
var sort = 'type,price'; // price: asc, -price: desc
// name: includes name, exclude all other (except _id - always visible except explicit hide)
//-name: excludes name, include all other
var select = '-__v,-_id';
var name = '';//'Trứng gà';
var type = 'T';//'Thịt';
var vals; // '30': x > 30; ',60': x < 60, '30,60': 30 < x < 60

var query = '{"type": "Thịt"}';

db.on('open', function() {

    Foods.find(JSON.parse(query))
    .limit(Number(limit))
    .sort(sort ? sort.replace(',', ' ') : '')
    .select(select ? select.replace(',', ' ') : '')
    .exec(function(err, result) {
        if (err) return console.error(err);
        
        console.log(result);
        console.log(result.length);
    });

});