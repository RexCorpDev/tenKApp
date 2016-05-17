'use strict';

var app = angular.module('tenKApp');

app.factory('mySocket', function (socketFactory) {
  var service = socketFactory();
  service.forward('error');
  return service;
});
