'use strict';

/*global ajaxFunctions */
/*global appUrl*/

(function () {
    
    var timestamp = document.querySelector('#timestamp');
    var result = document.querySelector('#result');
    var sendButton = document.querySelector('.btn-send');
    var apiUrl = appUrl + '/api/timestamp';
    
    ajaxFunctions.ready();
    
    sendButton.addEventListener('click', function () {
        if (timestamp.value) {
            ajaxFunctions.ajaxRequest('GET', apiUrl + '/' + timestamp.value, function (data) {
                result.innerHTML = data;
            });
        } else {
            result.innerHTML = '';
        }
    });
    
})();