"use strict";

var app = angular.module("tenKApp", ["ui.router", "btford.socket-io"])


app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state("home", {
    url : "/",
    views : {
      "dice" : {
        templateUrl : "html/dice.html",
        controller : "diceController"
      }
    }
  })



  $urlRouterProvider.otherwise("/");
});
