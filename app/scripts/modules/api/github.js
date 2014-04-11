'use strict';

/* Services */

var GitHubService = angular.module('GitHubService', []);

GitHubService.service('GitHubService',function($http){
  
  var oauthURL  = 'http://github.com/login/oauth/authorize';
  var clientId = '1a510bdc3d096a385053';
  var scopes    = 'user,repo';
  
  this.getUrl = function(){
    return oauthURL + '?client_id=' + clientId + '&scope=' + scopes;
  };
  
  this.sendCode = function(codeUrl) {
    return $http.post('http://localhost:3000/login/oauth/access_token?code='+codeUrl)
      .then(function (res) {
        console.log(res);
        var token = res.data.split('access_token=')[1].split('&')[0];
        console.log('devolvelo ' + token);
        return token;
      });
  };
  
  this.getRepos = function(token) {
    return $http.get('http://localhost:3000/api/user/starred?access_token=' + token);
  };
});