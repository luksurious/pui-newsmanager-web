/**
 * INFO: imported templates will be simply strings of HTML in the end
 */
// import NewsListTemplate from './pages/news-list/news-list.html';
// import NewsDetailTemplate from './pages/news-detail/news-detail.html';
// import NewsEditTemplate from './pages/news-edit/news-edit.html';
// import NewsCreateTemplate from './pages/news-creation/news-creation.html';

angular.module('news.app')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(false);

            $routeProvider.
                when('/', {
                    controller: 'NewsListController',
                    templateUrl: 'src/news/pages/news-list/news-list.html'
                }).
                when('/category/:category', {
                    controller: 'NewsListController',
                    templateUrl: 'src/news/pages/news-list/news-list.html'
                }).
                when('/search/:searchTerm', {
                    controller: 'NewsListController',
                    templateUrl: 'src/news/pages/news-list/news-list.html'
                }).
                when('/create', {
                    controller: 'NewsCreateController',
                    templateUrl: 'src/news/pages/news-creation/news-creation.html'
                }).
                when('/article/:id', {
                    controller: 'NewsDetailController',
                    templateUrl: 'src/news/pages/news-detail/news-detail.html'
                }).
                when('/article/:id/edit', {
                    controller: 'NewsEditController',
                    templateUrl: 'src/news/pages/news-edit/news-edit.html'
                }).
                otherwise('/');
        }
    ]);
