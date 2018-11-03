import template from './news-login.html';
import NewsLoginController from './news-login.controller';

angular.module('news.app')
    .directive('newsLogin', function () {
        return {
            controller: NewsLoginController,
            template: template
        };
    });