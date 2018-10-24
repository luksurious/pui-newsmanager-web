import NewsListTemplate from './components/news-list.html';
import NewsDetailTemplate from './components/news-detail.html';
import NewsEditTemplate from './components/news-edit.html';

angular.module('news.app')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(true);

            $routeProvider.
                when('/', {
                    controller: 'NewsListController',
                    controllerAs: 'vm',
                    template: NewsListTemplate
                }).
                when('/category/:category', {
                    controller: 'NewsListController',
                    controllerAs: 'vm',
                    template: NewsListTemplate
                }).
                when('/article/:id', {
                    controller: 'NewsDetailController',
                    controllerAs: 'vm',
                    template: NewsDetailTemplate
                }).
                when('/article/:id/edit', {
                    controller: 'NewsEditController',
                    controllerAs: 'vm',
                    template: NewsEditTemplate
                }).
                otherwise('/');
        }
    ]);