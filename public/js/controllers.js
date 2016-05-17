"use strict";

var app = angular.module("tenKApp");

app.controller("mainController", function (mySocket) {
    console.log("Main Controller");

    mySocket.emit('hello', function(yo){
      var yo = 'yo!';
    })

});
