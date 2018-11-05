// import template from './navlink.html';

/**
 * INFO: this directive makes sure that the active state of the links are updated when the page is changed
 */
angular.module('news.app')
    .directive('newsNavlink', ['$location', function ($location) {
        function adjustActiveClass(isActive, attrs) {
            if (isActive) {
                attrs.$addClass('active');
            } else {
                attrs.$removeClass('active');
            }
        }

        return {
            transclude: true,
            scope: {
                route: '='
            },
            templateUrl: 'src/news/components/header/navlink.html',
            link: function ($scope, element, attrs) {
                $scope.isActive = function () {
                    return $location.path() == $scope.route;
                };

                adjustActiveClass($scope.isActive(), attrs);

                // maybe would be better to do it on $routeChangeSuccess
                $scope.$watch('isActive()', function (newValue) {
                    adjustActiveClass(newValue, attrs);
                });
            }
        };
    }]);
