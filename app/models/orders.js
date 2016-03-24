'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
    _table: {
        type: Number,
        ref: 'Table'
    },
    paid: {
        type: Boolean,
        require: true,
        default: false
    },
    items: [{
        _food: {
            type: Schema.Types.ObjectId,
            ref: 'Food'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        note: String
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Order', Order);
