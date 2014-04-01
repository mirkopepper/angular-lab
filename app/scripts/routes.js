var AppRoutes = angular.module('AppRoutes', ['angularLabApp']);

AppRoutes.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    .when(
      '/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }
    )
    .when('/about',{
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
    .when('/contact',{
        templateUrl: 'views/contact.html',
        controller: 'AboutCtrl'
      })
    .otherwise({redirectTo:'/'});
  
  $locationProvider.html5Mode(true);
  
}]);