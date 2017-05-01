'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('portal', {
    url: '/portal',
    template: require('./portal.html'),
    controller: 'PortalController',
    controllerAs: 'admin',
    authenticate: true
  })
  	.state('thanks', {
  		url: '/thanks',
  		template: require('./thanks/thanks.html'),
  		controller: 'ThanksController',
  		controllerAs: 'admin',
  		authenticate: true
  	});
}
