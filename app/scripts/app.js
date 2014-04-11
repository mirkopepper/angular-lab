'use strict';

angular.module('angularLabApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'GitHubService',
  'DasboardController'
])
// Enable CORS
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.controller('AppController', function($scope){
  
})
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  var templateUrl = function (name) {
    return 'scripts/widgets/dashboard/views/' + name + '.html';
  };
  
  $routeProvider
    .when(
      '/', {
      templateUrl : templateUrl('main'),
      controller  : 'MainController'
    })
    .when('/about',{
        templateUrl : templateUrl('about'),
        controller  : 'AboutController'
      })
    .when('/contact',{
        templateUrl : templateUrl('contact'),
        controller  : 'ContactController'
      })
    .otherwise({redirectTo:'/'});
  
  $locationProvider.html5Mode(true);
  
}]);