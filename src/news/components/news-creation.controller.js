angular.module('news.app')
    .controller('NewsCreateController', function ($scope, $rootScope, NewsDetailsService, ngToast, $location) {
        $scope.data = {};

        if (!$rootScope.loggedInUser) {
            ngToast.warning('You are not allowed to access this page');
            $location.path('/');
            return;
        }

        $scope.create = function () {
            NewsDetailsService.save($scope.data).$promise.then(
                function (r) {
                    ngToast.create('Published !');
                    window.location.href = 'article/' + r.id;
                }
            ).catch(
                function (e) {
                    console.log(e);
                    ngToast.danger('It didn\'t work, come back later');
                }
            )
        };

        $scope.onBodyChanged = function () {
            $scope.createForm.body.$setTouched();
        };
    });
