'use strict';

var fs = require('fs');

var foods = "Sườn cốt lếch-Thanh cua-Thịt nạc dăm-Thịt xay-Tiêu đen Lekumki-Tiêu xanh";

var foodsJson = [];

foods.split('-').forEach(function (val) {
    foodsJson.push({ 'name': val, 'type': '', 'price': Math.floor(Math.random() * 81) + 20});
});

fs.writeFile(__dirname + "/app/db/food.json", JSON.stringify(foodsJson), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});