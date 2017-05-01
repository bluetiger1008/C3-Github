'use strict';

import angular from 'angular';
import routes from './authenticate.routes';
import AuthenticateController from './authenticate.controller';

export default angular.module('icaApp.authenticate', ['ui.router'])
  .config(routes)
  .controller('AuthenticateController', AuthenticateController)
  .name;
