'use strict';

var fs = require('fs');

var foodStr = "Bánh mì -Bì heo -Bò phi lê -Bò xay -Bún gạo -Bột chiên giòn -Chả lụa -Cà chua -Cà paste -Cà rốt -Cá mặn (Khô cá chét) -Cá ngừ hộp -Cá viên -Cải ngọt -Cải thảo -Dưa leo -Gan heo -Giá -Giò sống -Gạo -Gạo tấm -Hành tây -Hẹ -Hủ tiếu -Hủ tiếu mềm -Jambon -Khoai lang -Khoai môn -Khoai tây sợi -Lá bía -Lá rong biển -Lạp xưởng -Mì gói -Mì trứng -Mì ý -Mực lá không đầu nhỏ -Mực ống không đâu -Nui -Sanwich -Sườn cốt lếch -Thanh cua -Thịt nạc dăm -Thịt xay -Tiêu xanh -Tiêu đen Lekumki -Trứng gà -Tôm sú lớn 1kg=40 con -Tôm sú ngộp 1kg =60 c0n -Tôm viên -Xà lách nhún -Xá xíu (làm từ nạc dăm) -Đùi gà 1/4 -Đậu hũ -Đậu que -Đồ chua -Ớt xanh Đà lạt";
var foods = [];

foodStr.split('-').forEach(function (val) {
    foods.push({ 'name': val.trim(), 'type': val.trim().split(' ')[0], 'price': Math.floor(Math.random() * 81) + 20});
});

fs.writeFile("app/db/food_test.json", JSON.stringify(foods), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});