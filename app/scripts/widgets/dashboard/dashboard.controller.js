'use strict';

var DashboardController = angular.module('DasboardController',['angularLabApp']);

DashboardController

  .controller('HeaderController', function($scope, $location){
    
    $scope.title = 'Angular Lab App';
    $scope.isActive = function(viewLocation){
      return viewLocation === $location.path();
    };
  
  })

  .controller('MainController', function($scope, $routeParams, GitHubService) {
    $scope.isLogged = false;
    $scope.data = [];
    $scope.getOauthUrl = function(){
      window.location =  GitHubService.getUrl();
    };
    $scope.body = {
      signin  : 'Hello, you must be signed into your GitHub account',
      login   : 'Login with Github'
    };
    var code = location.search.split('code=')[1];
    GitHubService.sendCode(code)
      .then(function(token){
        $scope.token = token;
        $scope.isLogged = true;
        GitHubService.getRepos(token)
          .then(function(res){
            $scope.data = res.data;
            console.log($scope.data);
          });
      });
    
  })

  .controller('AboutController', function($scope){
  
})

  .controller('ContactController', function($scope){
  
})

  .controller('FooterController', function($scope){
    
    $scope.footerText = 'github.com/mirkopepper/angular-lab';
  
  });