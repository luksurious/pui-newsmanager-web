'use strict';

/* Services */
let app = angular.module('news.services');

// Post login information and returns the apikey of the user sent when the login succedded
// The format of the input must be:
// {passwd: "password", ​username: "user"}
// The expected output when the request succedded contains (among other info):
// {Authorization: "PUIRESTAUTH",
//  apikey: "APIKEYOFTHEUSER",
//  username: "groman", ...}

app.factory('LoginService', ['$resource', 'config', function ($resource, config) {
	return $resource(config.apiEndpoint + '/login', {},
		{
			login: {method: 'post'}
		});
}]);

// The list of news contain elements with the following fields:
// {"id":...,
//  "id_user":...,
//  "abstract":...,
//  "subtitle":...,
//  "update_date":...,
//  "category":...,
//  "title":...,
//  "thumbnail_image":...,
//  "thumbnail_media_type":...}

app.factory('NewsListService', ['$resource', 'config', function ($resource, config) {
	return $resource(config.apiEndpoint + '/articles', {},
		{
			query: {method: 'get', isArray: true}
		});
}]);

// A news contains the following elements:
// {"id":...,
//  "id_user":...,
//  "abstract":...,
//  "subtitle":...,
//  "update_date":...,
//  "category":...,
//  "title":...,
//  "image_data":...,
//  "image_media_type":...}

app.factory('NewsDetailsService', ['$resource', 'config', function ($resource, config) {
	return $resource(config.apiEndpoint + '/article/:id', { id: '@_id' },
		{
			get: {method: 'get'},
			delete: {method: 'delete'},
			save: {method: 'post'}
		});
}]);

app.factory('NewsUserResolver', function () {
	const USER_MAP = {
		// unknown user
		11: 'Admin',
		103: 'lukas.bruckner',
		108: 'v.giardina',
		120: 'l.litwin'
	};

	return function (id) {
		return USER_MAP[id] || 'Unknown';
	};
});
