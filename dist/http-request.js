/**
 * Author: Nate McNeil
 * natemcneil.com
 * nhmcneil@gmail.com
 * version: 0.2
 * **/

'use strict';

angular.module('http.request', [])

	.provider('HttpRequest', ['$httpProvider', function ($httpProvider) {
		// General configuration
		var provider = this;

		// initialize new configurations
		$httpProvider.defaults.params = {};

		this.configuration = {
			defaults: $httpProvider.defaults,
			interceptors: $httpProvider.interceptors,
			responseInterceptors: $httpProvider.responseInterceptors,
			urlBase: '',
			urlSuffix: ''
		};


		// URL configuration and methods
		function buildUrl(url) {
			return provider.configuration.urlBase + url + provider.configuration.urlSuffix
		}

		this.setUrlBase = function (url) {
			provider.configuration.urlBase = url
		};

		this.setUrlSuffix = function (suffix) {
			provider.configuration.urlSuffix = suffix
		};


		// Header configuration and methods
		this.setAuthHeader = function (type, value) {
			provider.configuration.defaults.headers.common.Authorization = type + ' ' + value
		};

		this.setHeader = function (name, value) {
			provider.configuration.defaults.headers.common[name] = value
		};


		// Request params configuration and methods
		this.setDefaultParams = function (name, value) {
			provider.configuration.defaults.params[name] = value
		};

		function buildParams(config){
			var params = angular.copy(provider.configuration.defaults.params);
			if (config != undefined){
				if (config.params != undefined && config.params.length > 0) {
					for (var p in config.params){
						params[p] = config.params[p];
					}
				}
			}
			return params
		}


		// Service core
		this.$get = ['$http', function($http) {
			var service = {};

			// Service configuration methods
			service.setUrlBase = provider.setUrlBase;
			service.setUrlSuffix = provider.setUrlSuffix;
			service.setAuthHeader = provider.setAuthHeader;
			service.setHeader = provider.setHeader;
			service.setDefaultParams = provider.setDefaultParams;


			// Raw requests (methods without UrlBase)
			service.rawWithoutData = function (method, url, config) {
				return $http(angular.extend({}, config || {}, {
					method: method,
					url: url
				}));
			};

			service.rawWithData =  function (method, url, data, config) {
				return $http(angular.extend({}, config || {}, {
					method: method,
					url: url,
					data: data
				}))
			};

			service.rawCompletely = function (config) {
				return $http(config)
			};


			// request methods construction
			function createMethods() {
				angular.forEach(arguments, function(name) {
					service[name] = function(url, config) {

						var params = buildParams(config);

						return $http(angular.extend({}, config || {}, {
							method: name,
							url: buildUrl(url),
							params: params
						}));
					};
				});
			}

			function createMethodsWithData() {
				angular.forEach(arguments, function(name) {
					service[name] = function(url, data, config) {

						var params = buildParams(config);

						return $http(angular.extend({}, config || {}, {
							method: name,
							url: buildUrl(url),
							data: data,
							params: params
						}));
					};
				});
			}

			createMethods('get', 'delete', 'head', 'jsonp');
			createMethodsWithData('post', 'put', 'patch');

			return service
		}]

	}]);