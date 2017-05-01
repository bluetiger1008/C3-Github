'use strict';

import angular from 'angular';

export default angular.module('icaApp.modelTypeFactory',[])
	.factory('modelTypeFactory', ['$http', function($http) {
		var urlBase = '/api/modeltypes';
		var modelTypeFactory = {};

		modelTypeFactory.getModelTypes = function () {
			return $http.get(urlBase);
		};

		modelTypeFactory.addModelType = function (mod) {
			return $http.post(urlBase, mod);
		};

		modelTypeFactory.deleteModelType = function (id) {
			return $http.delete(urlBase + '/' + id);
		};

		modelTypeFactory.updateModelType = function (id, mod) {
			return $http.put(urlBase + '/' + id, mod);
		};

		modelTypeFactory.findModelType = function (id) {
			return $http.get(urlBase + '/' + id);
		}

		return modelTypeFactory;
	}])
	.name;
