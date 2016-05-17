"use strict";

var app = angular.module("tenKApp");

app.controller("mainController", function (mySocket) {
    console.log("Main Controller");

    var yo = 'yo!';
    mySocket.emit('hello', yo);

});
