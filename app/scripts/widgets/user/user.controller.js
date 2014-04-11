'use strict';

angular.module('angularLabApp')
  .controller('UserController', function($scope){
    $scope.isLogged = false;
    var user, repos, acces_token;
  });