/**
 * INFO: common-libraries include all external, non-news specific code
 */
// import '../common/common-libraries';

/**
 * INFO: the specific API key and URL are separated so that those sensitive information is not part of the regular source code
 */
// import './config';
// import './services/news-services';

/**
 * INFO: imported CSS files will be put into a separate CSS file and loaded in the index.html automatically
 */
// import './app.css';

angular.module('news.app', ['common-libraries', 'news.config', 'news.services'])
	.run(['$http', 'config', function ($http, config) {
		$http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=' + config.apiKey;
	}]);

/**
 * INFO: Using "require" because they must be loaded after "news.app" is defined
 */
// require('./news-route');
// require('./components/header/header.directive');
// require('./components/news-login/news-login.directive');

// require('./pages/news-list/news-list.controller');
// require('./pages/news-detail/news-detail.controller');
// require('./pages/news-edit/news-edit.controller');
// require('./pages/news-creation/news-creation.controller');
