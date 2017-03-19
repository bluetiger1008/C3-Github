'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('portal', {
    url: '/portal',
    template: '<portal></portal>'
  });
}
