'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: require('./main.html'),
    controller: 'MainController',
    controllerAs: 'vm',
  });
}
