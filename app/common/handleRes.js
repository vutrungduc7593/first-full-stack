'use strict';

function HandleRes () {

    this.send = function(res, message, result) {
        res.json({
            status: 'OK',
            message: message,
            data: result
        });
    };

    this.error = function(res, error) {
        res.json({
           status: 'ERROR',
           message: error.toString(),
           data: null
        });
    };

}

module.exports = HandleRes;
