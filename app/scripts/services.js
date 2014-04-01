'use strict';

/* Services */

var GitHubService = angular.module('GitHubService', []);

GitHubService.service('GitHubGetService',function(){
  
  var oauthURL  = 'http://github.com/login/oauth/authorize';
  var client_id = '1a510bdc3d096a385053';
  var scopes    = 'user,repo';
  
  this.getUrl = function() {
        return oauthURL + '?client_id=' + client_id + '&scope=' + scopes;
    };
});

GitHubService.service('GitHubPostService', function($http) {
  
  this.sendCode = function(codeUrl) {
    console.log(codeUrl);
    $http.post('http://localhost:3000/login/oauth/access_token?code='+codeUrl)
      .success(function (data, status, headers, config) {
        return data;
      })
      .error(function (data, status, headers, config) {
        var status = status;
        console.log(status);
      });
  };
});