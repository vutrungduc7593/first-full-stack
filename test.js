var string = "893500230101";

var nums = string.split('').map(function (val) {
    return Number(val);
});

var b1 = nums.reduce(function (pv, cv, i) {
    return i % 2 === 0 ? pv + 0 : pv + cv;
});

var b2 = b1 * 3;

var b3 = nums.reduce(function (pv, cv, i) {
    return i % 2 === 1 ? pv + 0 : pv + cv;
});

var b4 = b2 + b3;

var b5 = Math.ceil(b4 / 10) * 10 - b4;

console.log(b5);