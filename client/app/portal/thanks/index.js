'use strict';

import angular from 'angular';
import ThanksController from './thanks.controller';

export default angular.module('icaApp.thanks', [])
  .controller('ThanksController', ThanksController)
  .name;
