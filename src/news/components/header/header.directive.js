// import template from './header.html';
// import HeaderController from './header.controller';
// Since the header requires the navlink directive it is directly imported here
// import './navlink.directive';

angular.module('news.app')
    .directive('newsHeader', function () {
        return {
            controller: 'HeaderController',
            templateUrl: 'src/news/components/header/header.html'
        };
    });