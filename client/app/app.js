'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-xeditable';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import header from '../components/header/header.component';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import login from '../components/login/login.component';
import signup from '../components/signup/signup.component';
import main from './main/main.component';
import portal from './portal/portal.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

angular.module('icaApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, 'xeditable', _Auth, account, admin, navbar, header, footer, login, signup, main, portal, constants, socket, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth, editableOptions) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    editableOptions.theme = 'bs3';

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['icaApp'], {
      strictDi: true
    });
  });
