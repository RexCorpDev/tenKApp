"use strict";

var app = angular.module("tenKApp");

app.controller("mainController", function (mySocket, $scope) {
  console.log("Main Controller");

  var yo = 'yo!';
  mySocket.emit('hello', yo);

  // console.log('results', $scope.results);
  //
});

app.controller('diceController', function($scope){
  console.log("diceController");




});
