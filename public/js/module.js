"use strict";

var app = angular.module("tenKApp", ["ui.router", "btford.socket-io"])


app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("home", {
            url : "/",
            templateUrl: "",

        })


    $urlRouterProvider.otherwise("/");
});
