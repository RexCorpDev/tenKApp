"use strict";

var app = angular.module("tenKApp");

app.controller("mainController", function (mySocket, $scope) {
  console.log("Main Controller");

  var yo = 'yo!';
  mySocket.emit('hello', yo);

  // console.log('results', $scope.results);
  //
});

app.controller('diceController', function($scope, mySocket){
  console.log("diceController");
  $scope.continue = true;
  $scope.totalScore = 0;
  $scope.turnScore = 0;
  $scope.rollScore = 0;

  mySocket.on('rollResults', resObj => {
    console.log('resObj= ', resObj);

    $scope.totalScore += resObj.totalScore;
    $scope.turnScore += resObj.turnScore;
    $scope.rollScore = resObj.rollScore;

    if(resObj.continue === false){
      $scope.continue = false;
    };
  });


  $scope.getDice = () => {

    if($scope.continue === true){
      mySocket.emit('rolledDice');
    };
  };


});
