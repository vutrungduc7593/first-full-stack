'use strict';

function HandleRes () {

    this.send = function(res, message, result) {
        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.json({
            status: 'OK',
            message: message,
            data: result
        });
    };

    this.error = function(res, error) {
        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.json({
           status: 'ERROR',
           message: error.toString(),
           data: null
        });
    };

}

module.exports = HandleRes;
