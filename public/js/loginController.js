'use strict';

/* global angular */

(function () {
    angular.module('clementineApp', ['ngResource'])
        .controller('loginController', ['$scope', '$http', function ($scope, $http) {
            
            $scope.login = function () {
                
                var data = $.param({
                    json: JSON.stringify({
                        sername: $scope.username,
                        password: $scope.password
                    })
                });
            
                var config = {
                    headers : {
                        'Authorization': 'Basic: MjMwMzIwMTY6YXBpa2V5MjMwMzIwMTY='
                    }
                };
    
                $http.post('/api/login', data)
                    .success(function (data, status, headers, config) {
                        console.log('Success');
                    })
                    .error(function (data, status, header, config) {
                        console.log('Fail: ' + data);
                    });
                
            };
            
        }]);
})();