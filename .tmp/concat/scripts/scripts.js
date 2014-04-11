'use strict';
angular.module('angularLabApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'GitHubService',
  'Dasboard',
  'User',
  'Repos',
  'Log'
]).config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]).controller('AppController', function ($scope) {
}).config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    var templateUrl = function (name) {
      return 'widgets/dashboard/views/' + name + '.html';
    };
    $routeProvider.when('/', {
      templateUrl: templateUrl('main'),
      controller: 'MainController'
    }).when('/about', {
      templateUrl: templateUrl('about'),
      controller: 'AboutController'
    }).when('/contact', {
      templateUrl: templateUrl('contact'),
      controller: 'ContactController'
    }).otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
  }
]);
'use strict';
/* Services */
angular.module('GitHubService', []);
GitHubService.service('GitHubService', function ($http, $routeParams) {
  var oauthURL = 'http://github.com/login/oauth/authorize';
  var client_id = '1a510bdc3d096a385053';
  var scopes = 'user,repo';
  this.getUrl = function () {
    return oauthURL + '?client_id=' + client_id + '&scope=' + scopes;
  };
  this.sendCode = function (codeUrl) {
    return $http.post('http://localhost:3000/login/oauth/access_token?code=' + codeUrl).then(function (res, status, headers, config) {
      console.log(res);
      var token = res.data.split('access_token=')[1].split('&')[0];
      console.log('devolvelo ' + token);
      return token;
    });
  };
  this.getRepos = function (token) {
    return $http.get('http://localhost:3000/api/user/starred?access_token=' + token);
  };
});
'use strict';
var DashboardController = angular.module('DasboardController', ['angularLabApp']);
DashboardController.controller('HeaderController', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.title = 'Angular Lab App';
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }
]).controller('MainController', [
  '$scope',
  '$routeParams',
  'GitHubService',
  function ($scope, $routeParams, GitHubService) {
    $scope.isLogged = false;
    $scope.data = [];
    $scope.getOauthUrl = function () {
      window.location = GitHubService.getUrl();
    };
    $scope.body = {
      signin: 'Hello, you must be signed into your GitHub account',
      login: 'Login with Github'
    };
    var code = location.search.split('code=')[1];
    GitHubService.sendCode(code).then(function (token) {
      console.log('tamo aca ' + token);
      $scope.token = token;
      $scope.isLogged = true;
      GitHubService.getRepos(token).then(function (res) {
        $scope.data = res.data;
        console.log($scope.data);
      });
    });
  }
]).controller('AboutController', [
  '$scope',
  function ($scope) {
  }
]).controller('ContactController', [
  '$scope',
  function ($scope) {
  }
]).controller('FooterController', [
  '$scope',
  function ($scope) {
    $scope.footerText = 'github.com/mirkopepper/angular-lab';
  }
]);
'use strict';
angular.module('angularLabApp').controller('UserController', [
  '$scope',
  function ($scope) {
    $scope.isLogged = false;
    var user, repos, acces_token;
  }
]);