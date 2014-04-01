'use strict';

var AppControllers = angular.module('AppControllers',['angularLabApp']);

AppControllers.controller('HeaderController', function($scope, $location){
  $scope.isActive = function(viewLocation){
    return viewLocation === $location.path();
  }
});

AppControllers.controller('MainCtrl', function($scope, $routeParams, GitHubGetService, GitHubPostService) {
    
    $scope.getOauthUrl = function(){
      window.location =  GitHubGetService.getUrl();
    };
    var code = location.search.split('code=')[1];
    var token = GitHubPostService.sendCode(code);
    console.log(token);
    $scope.showButton = function(){
      if(token!=undefined)
        return true;
    }
  });

AppControllers.controller('AboutCtrl', function ($scope, GitHubService) {
    
    $scope.show = { text: 'Nothing here yet!' };
    
  });