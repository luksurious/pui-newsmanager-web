import '../common/common-libraries';

import './config';
import './services/news-services';

import './app.css';

angular.module('news.app', ['common-libraries', 'news.config', 'news.services'])
	.run(['$http', 'config', function ($http, config) {
		$http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=' + config.apiKey;
	}]);

require('./news-route');
require('./components/header/header.directive');
require('./components/news-login/news-login.directive');

require('./pages/news-list/news-list.controller');
require('./pages/news-detail/news-detail.controller');
require('./pages/news-edit/news-edit.controller');
require('./pages/news-creation/news-creation.controller');
