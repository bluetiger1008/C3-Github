'use strict';

import angular from 'angular';

export default angular.module('icaApp.modelFactory',[])
	.factory('modelFactory', ['$http', function($http) {
		var urlBase = '/api/models';
		var modelFactory = {};

		modelFactory.getModels = function () {
			return $http.get(urlBase);
		};

		modelFactory.addModel = function (mod) {
			return $http.post(urlBase, mod);
		};

		modelFactory.deleteModel = function (id) {
			return $http.delete(urlBase + '/' + id);
		};

		modelFactory.updateModel = function (id, mod) {
			return $http.put(urlBase + '/' + id, mod);
		};

		modelFactory.findModel = function (id) {
			return $http.get(urlBase + '/' + id);
		}
		return modelFactory;
	}])
	.name;
