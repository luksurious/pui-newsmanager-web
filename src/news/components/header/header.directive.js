import template from './header.html';
import HeaderController from './header.controller';
import './navlink.directive';

angular.module('news.app')
    .directive('newsHeader', function () {
        return {
            controller: HeaderController,
            template: template
        };
    });