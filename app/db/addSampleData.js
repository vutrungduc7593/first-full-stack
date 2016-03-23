// TODO: Test this

'use strict';

var Foods = require('../models/foods.js');
var Tables = require('../models/foods.js');
var Restaurants = require('../models/foods.js');
var Orders = require('../models/foods.js');

// Tables
var tables = [];
for (var i = 0; i < 10; i++) {
    tables.push({
        number: i + 1
    });
}

Tables.create(tables, function(err, tables) {
    if (err) return console.error(err);
    console.log('Saved %d tables', tables.length);
});

// Restaurants
var restaurant = {
    name: 'Quán ăn ngon',
    address: 'Hà Nội',
    phone: '0123456789',
    email: 'quanan123@gmail.com'
};

Restaurants.create(restaurant, function(err, restaurant) {
    if (err) return console.error(err);
    console.log('Saved %s restaurant at %d', restaurant.name, restaurant._id);
});

// Foods
var foodStr = "Bánh mì -Bì heo -Bò phi lê -Bò xay -Bún gạo -Bột chiên giòn -Chả lụa -Cà chua -Cà paste -Cà rốt -Cá mặn (Khô cá chét) -Cá ngừ hộp -Cá viên -Cải ngọt -Cải thảo -Dưa leo -Gan heo -Giá -Giò sống -Gạo -Gạo tấm -Hành tây -Hẹ -Hủ tiếu -Hủ tiếu mềm -Jambon -Khoai lang -Khoai môn -Khoai tây sợi -Lá bía -Lá rong biển -Lạp xưởng -Mì gói -Mì trứng -Mì ý -Mực lá không đầu nhỏ -Mực ống không đâu -Nui -Sanwich -Sườn cốt lếch -Thanh cua -Thịt nạc dăm -Thịt xay -Tiêu xanh -Tiêu đen Lekumki -Trứng gà -Tôm sú lớn 1kg=40 con -Tôm sú ngộp 1kg =60 c0n -Tôm viên -Xà lách nhún -Xá xíu (làm từ nạc dăm) -Đùi gà 1/4 -Đậu hũ -Đậu que -Đồ chua -Ớt xanh Đà lạt";
var foods = [];

foodStr.split('-').forEach(function(val) {
    foods.push({
        'name': val.trim(),
        'type': val.trim().split(' ')[0],
        'price': Math.floor(Math.random() * 81) + 20
    });
});

Foods.create(foods, function(err, foods) {
    if (err) return console.error(err);
    console.log('Saved %d tables', tables.length);
});

// Orders
// Need run after dimension tables
Foods
    .find({})
    .select('_id')
    .exec(function(err, result) {
        if (err) return console.error(err);

        var orders = [];
        var foodIds = result.map(function(val) {
            return val._id;
        });

        for (var i = 0; i < 100; i++) {

            var items = [];
            for (var j = 0; j < 5; j++) {
                items.push({
                    food: foodIds[Math.floor(Math.random() * foodIds.length)],
                    quantity: Math.floor(Math.random() * 3) + 1,
                    note: ''
                });
            }

            orders.push({
                _table: Math.floor(Math.random() * tables.length) + 1,
                paid: i === 99 ? false : true,
                items: items
            });

            Orders.create(orders, function(err, orders) {
                if (err) return console.error(err);
                console.log('Saved %d tables', orders.length);
            });
        }
    });
