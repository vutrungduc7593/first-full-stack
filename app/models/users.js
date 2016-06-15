'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String,
        publicRepos: Number
    },
    nbrClicks: {
        clicks: Number
    },
    gcmIds: [String],
    username: String,
    password: String,
    _role: { type: Schema.Types.ObjectId, ref: 'Role' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('User', User);
