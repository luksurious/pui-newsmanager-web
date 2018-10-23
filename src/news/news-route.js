import NewsListTemplate from './components/news-list.html';
import NewsDetailTemplate from './components/news-detail.html';
import NewsEditTemplate from './components/news-edit.html';

angular.module('news.app')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(true);

            $routeProvider.
                when('/news/category/:category', {
                    controller: 'NewsListController',
                    controllerAs: 'vm',
                    template: NewsListTemplate
                }).
                when('/news/:id', {
                    controller: 'NewsDetailController',
                    controllerAs: 'vm',
                    template: NewsDetailTemplate
                }).
                when('/news/:id/edit', {
                    controller: 'NewsEditController',
                    controllerAs: 'vm',
                    template: NewsEditTemplate
                }).
                when('/', {
                    controller: 'NewsListController',
                    controllerAs: 'vm',
                    template: NewsListTemplate
                })
                .otherwise('/');
        }
    ]);