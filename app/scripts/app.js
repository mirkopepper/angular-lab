'use strict';

angular.module('angularLabApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'GitHubService',
  'AppControllers',
  'AppRoutes'
])
// Enable CORS
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.controller('AppController', function($scope, $routeParams, $http){
  $scope.name = "mirko";
});