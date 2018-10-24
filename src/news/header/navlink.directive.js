import template from './navlink.html';

angular.module('news.app')
    .directive('newsNavlink', function () {
        return {
            transclude: true,
            scope: {
                route: '='
            },
            controller: function ($scope, $location) {
                $scope.isActive = function () {
                    return $location.path() == $scope.route;
                };
            },
            template: template,
            link: function (scope, element, attrs) {
                function adjustActiveClass(isActive) {
                    if (isActive) {
                        attrs.$addClass('active');
                    } else {
                        attrs.$removeClass('active');
                    }
                }

                adjustActiveClass(scope.isActive());

                scope.$watch('isActive()', function (newValue, oldValue) {
                    adjustActiveClass(newValue);
                });
            }
        };
    });