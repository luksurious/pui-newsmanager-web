import './services/services';
import './filters/image-base64-formatter';
import config from './config';

let app = angular.module("news.app", ["ngRoute", "ngResource", "ngSanitize", "news.services", 'imageBase64Formatter']);

require('./news-route');
require('./header/header.directive');
require('./components/news-list.controller');
require('./components/news-detail.controller');
require('./components/news-edit.controller');
require('./components/news-login.directive');

// TODO: Replace XXXXXXXX with the APIKEY your group anonymous apikey
// When the user is logged in, the apikey sent to the server must be updated to the
// apikey received from the server and it must be done in a controller
// $http.defaults.headers.common['Authorization'] = loginres.Authorization + ' apikey=' + loginres.apikey;

app.run(['$http', function ($http) {
	$http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=' + config.apiKey;
}]);
