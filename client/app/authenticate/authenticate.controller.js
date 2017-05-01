'use strict';

export default class AuthenticateController {
  $http;

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
  }

}