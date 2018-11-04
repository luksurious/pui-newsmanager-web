angular.module('news.app')
    .controller('NewsCreateController', ['$scope', '$rootScope', 'NewsDetailsService', 'ngToast', '$location',
        function ($scope, $rootScope, NewsDetailsService, ngToast, $location) {
            $scope.data = {};

            if (!$rootScope.loggedInUser) {
                ngToast.warning('You are not allowed to access this page');
                $location.path('/');
                return;
            }

            $scope.create = function () {
                NewsDetailsService.save($scope.data).$promise.then(
                    function (result) {
                        ngToast.create('Published !');
                        $location.path('/article/' + result.id);
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
        }
    ]);
