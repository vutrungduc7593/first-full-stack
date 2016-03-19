'use strict';

function TimeStampHandler () {
    
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    this.getTime = function (req, res) {
        var time = req.params.time;
        var date = new Date(isNaN(time) ? time : Number(time));
        res.json({ unix: date.getTime(), natural: date.getTime() ? months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() : null });
    };
}

module.exports = TimeStampHandler;