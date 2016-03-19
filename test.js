var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

function getTime(time) {
    console.log(time + ' ' + Number(time));
    var date = new Date(isNaN(time) ? time : Number(time));
    return { unix: date.getTime(), natural: date.getTime() ? months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() : null };
}

console.log(getTime("March 19, 2016"));
console.log(getTime("1458345600000"));
console.log(getTime("amcasd123"));

console.log(new Date(1458345600000));