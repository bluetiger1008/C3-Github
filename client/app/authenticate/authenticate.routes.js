'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('authenticate', {
    url: '/authenticate',
    template: require('./authenticate.html'),
    controller: 'AuthenticateController'
  });
}
