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

  $scope.totalScore = 0;
  var rollCounter = 1;

  $scope.turnScore = 0;
  var remainingDiceForTurn = 6;

  $scope.getDice = function(){
    console.log('dice to start turn ',remainingDiceForTurn);
    var rollDice = 0;
    console.log('roll dice to start ', rollDice);
    $scope.rollScore = 0;

    let result = [];
    let resultsObject = {};

    // 1) Generating Dice values
    // 2) assigning values to 'resultsObject'
    // 3) looking for STRAIGHT


    for(let i = 0; i < remainingDiceForTurn ; i++){
      let getRandomValue = Math.ceil(Math.random() * 6);
      result.push(getRandomValue);

      if(resultsObject[getRandomValue]) {
        resultsObject[getRandomValue]++;
      } else {
        resultsObject[getRandomValue] = 1;
      }
      console.log(resultsObject);

      if(Object.keys(resultsObject).length === 6) {
        $scope.score += 1500;
        $scope.rollScore = 'STRAIGHT : +1500 ';
      }
    };

    var scoreObj = {
      ones    : 0,
      fives   : 0,
      kind3of : {
        2 : 0 ,
        3 : 0,
        4 : 0,
        5 : 0,
        6  : 0
      }
    };
    result.forEach( n => {
      switch(parseInt(n)) {
        case 1 :
        console.log('1');
        scoreObj.ones++;
        scoreObj.kind3of[1]++;
        break;
        case 2 :
        console.log('2');
        scoreObj.kind3of[2]++;
        break;
        case 3 :
        console.log('3');
        scoreObj.kind3of[3]++;
        break;
        case 4 :
        console.log('4');
        scoreObj.kind3of[4]++;
        break;
        case 5 :
        console.log('5');
        scoreObj.fives++;
        scoreObj.kind3of[5]++;
        break;
        case 6 :
        console.log('6');
        scoreObj.kind3of[6]++;
        break;
        default : console.log('what the fuck?', n);
      };
    });

    console.log('result', result);
    console.log('SCORE OBJ\n',scoreObj);
    for(var j in scoreObj.kind3of){
      j = parseInt(j);
      while(scoreObj.kind3of[j] >= 3 && j !== 1 && j !== 5){
        console.log('j =',j);
        $scope.totalScore += (parseInt(j) * 100);
        $scope.rollScore += (parseInt(j) * 100);
        rollDice += 3;
        scoreObj.kind3of[j]-= 3;
      };
    };
    $scope.result = result;
    // console.log('result array ',result);

    while(scoreObj.ones > 0){
      if(scoreObj.ones >= 3){
        $scope.totalScore += 1000;
        $scope.rollScore += 1000;
        rollDice += 3;
        scoreObj.ones -= 3;
      } else {
        $scope.totalScore += scoreObj.ones * 100;
        $scope.rollScore += scoreObj.ones * 100;
        rollDice += scoreObj.ones;
        scoreObj.ones = 0;

      };
    };

    while(scoreObj.fives > 0){
      if(scoreObj.fives >= 3){
        $scope.totalScore += 500;
        $scope.rollScore += 500;
        rollDice += 3;
        scoreObj.fives -= 3;
      } else {
        $scope.totalScore += scoreObj.fives * 50;
        $scope.rollScore += scoreObj.fives * 50;
        rollDice += scoreObj.fives;
        scoreObj.fives = 0;
      };
    };

    remainingDiceForTurn -= rollDice;
    $scope.turnScore += $scope.rollScore;
    if()
  };
});
