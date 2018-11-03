import NewsListTemplate from './components/news-list/news-list.html';
import NewsDetailTemplate from './components/news-detail/news-detail.html';
import NewsEditTemplate from './components/news-edit/news-edit.html';
import NewsCreateTemplate from './components/news-creation/news-creation.html';

angular.module('news.app')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(true);

            $routeProvider.
                when('/', {
                    controller: 'NewsListController',
                    template: NewsListTemplate
                }).
                when('/category/:category', {
                    controller: 'NewsListController',
                    template: NewsListTemplate
                }).
                when('/search/:searchTerm', {
                    controller: 'NewsListController',
                    template: NewsListTemplate
                }).
                when('/create', {
                    controller: 'NewsCreateController',
                    template: NewsCreateTemplate
                }).
                when('/article/:id', {
                    controller: 'NewsDetailController',
                    template: NewsDetailTemplate
                }).
                when('/article/:id/edit', {
                    controller: 'NewsEditController',
                    template: NewsEditTemplate
                }).
                otherwise('/');
        }
    ]);
