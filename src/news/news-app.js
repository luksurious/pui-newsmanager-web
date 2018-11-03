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
require('./components/news-list/news-list.controller');
require('./components/news-detail/news-detail.controller');
require('./components/news-edit/news-edit.controller');
require('./components/news-creation/news-creation.controller');
require('./components/news-login/news-login.directive');
