'use strict';

/* global angular */

(function () {

angular
   .module('clementineApp', ['ngResource'])
   .controller('clickController', ['$scope', '$resource', function ($scope, $resource) {
      
      var Click = $resource('/web/api/1/clicks');
      
      $scope.getClicks = function () {
         Click.get(function (results) {
            $scope.clicks = results.clicks;
         });
      };
      
      $scope.getClicks();
      
      $scope.addClick = function () {
         Click.save(function (result) {
            $scope.clicks = result.clicks + 1;
         });
      };
      
      $scope.resetClicks = function () {
         Click.remove(function () {
            $scope.clicks = 0;
         });
      };
      
   }]);

})();