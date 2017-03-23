'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('portal', {
    url: '/portal',
    template: require('./portal.html'),
    controller: 'PortalController',
    controllerAs: 'vm'
  });
}
