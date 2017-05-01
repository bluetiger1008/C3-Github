'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class HeaderComponent {

	isLoggedIn: Function;

	constructor(Auth, $state){
		'ngInject';

		this.isLoggedIn = Auth.isLoggedInSync;
		this.$state = $state;
	}

	
}

export default angular.module('directives.header', [])
  .component('header', {
    template: require('./header.html'),
    controller: HeaderComponent,
    controllerAs: 'vm'
  })
  .name;
