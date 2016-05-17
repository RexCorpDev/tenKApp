'use strict';


var io = require('socket.io');

exports.initGame = (io, socket) => {

  socket.on('hello', data => {
    console.log('DATA\n',data);
  });

  var remainingDiceForTurn = 6;


  socket.on('rolledDice', () => {
    var resObj = {
      continue : true,
      totalScore : 0,
      turnScore : 0,
      rollScore : 0,
      diceResult : []
    };

    // var rollCounter = 1;

    console.log('dice to start turn ',remainingDiceForTurn);
    var rollDice = 0;
    console.log('roll dice to start ', rollDice);
    var rollScore = 0;

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
        score += 1500;
        rollScore = 'STRAIGHT : +1500 ';
      }
    };
    resObj.diceResult = result;
    console.log('diceResult');
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

    // console.log('result', result);
    // console.log('SCORE OBJ\n',scoreObj);
    for(var j in scoreObj.kind3of){
      j = parseInt(j);
      while(scoreObj.kind3of[j] >= 3 && j !== 1 && j !== 5){
        console.log('j =',j);
        resObj.totalScore += (parseInt(j) * 100);
        resObj.rollScore += (parseInt(j) * 100);
        rollDice += 3;
        scoreObj.kind3of[j]-= 3;
      };
    };
    result = result;
    // console.log('result array ',result);

    while(scoreObj.ones > 0){
      if(scoreObj.ones >= 3){
        resObj.totalScore += 1000;
        resObj.rollScore += 1000;
        rollDice += 3;
        scoreObj.ones -= 3;
      } else {
        resObj.totalScore += scoreObj.ones * 100;
        resObj.rollScore += scoreObj.ones * 100;
        rollDice += scoreObj.ones;
        scoreObj.ones = 0;

      };
    };

    while(scoreObj.fives > 0){
      if(scoreObj.fives >= 3){
        resObj.totalScore += 500;
        resObj.rollScore += 500;
        rollDice += 3;
        scoreObj.fives -= 3;
      } else {
        resObj.totalScore += scoreObj.fives * 50;
        resObj.rollScore += scoreObj.fives * 50;
        rollDice += scoreObj.fives;
        scoreObj.fives = 0;
      };
    };

    remainingDiceForTurn -= rollDice;
    resObj.turnScore += resObj.rollScore;
    if(rollDice > 0){
      resObj.continue = true;
    } else {
      resObj.continue = false;
    }
    socket.emit('rollResults', resObj);
  });
};
