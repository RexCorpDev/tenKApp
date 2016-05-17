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
  $scope.rollAgain = true;


  mySocket.on('rollResults', resObj => {
    console.log('resObj= ', resObj);

    $scope.totalScore += resObj.totalScore;
    $scope.turnScore += resObj.turnScore;
    $scope.rollScore = resObj.rollScore;

    $scope.dice1 = resObj.diceResult[0] ;
    $scope.dice2 = resObj.diceResult[1] ;
    $scope.dice3 = resObj.diceResult[2] ;
    $scope.dice4 = resObj.diceResult[3] ;
    $scope.dice5 = resObj.diceResult[4] ;
    $scope.dice6 = resObj.diceResult[5] ;





    if(resObj.continue === false){
      $scope.continue = false;
      $scope.rollAgain = false;
      $scope.playerStatus = resObj.playerN;
      console.log('roll again ', $scope.rollAgain);
    };
  });


  $scope.getDice = () => {

    if($scope.continue === true){
      $scope.gameStatus = "It's Your Turn";
      mySocket.emit('rolledDice');
    };
  };



});
