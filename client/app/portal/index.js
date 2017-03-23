'use strict';

import angular from 'angular';
import routes from './portal.routes';
import PortalController from './portal.controller';

export default angular.module('icaApp.portal', ['ui.router'])
  .config(routes)
  .controller('PortalController', PortalController)
  .name;
