'use strict';

var numUsers = 0;

module.exports = function (socket) {
    
    var addedUser = false;
    
    console.log('New user connected');
    
    socket.on('add user', function(username) {
        if (addedUser) return;
        
        socket.username = username;
        ++numUsers;
        addedUser = true;
        
        console.log('add user: ' + socket.username);
    });
    
    socket.on('new message', function(data) {
        
        console.log('new message: ' + socket.username + ': ' + data);
        
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });
    
    socket.on('disconnect', function() {
        console.log('user ' + socket.username + ' disconnected');
        numUsers--;
    });
};