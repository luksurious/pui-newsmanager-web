angular.module('news.app')
    .controller('NewsEditController', ['$scope', '$rootScope', 'NewsDetailsService', 'ngToast', '$routeParams', '$location',
        function ($scope, $rootScope, NewsDetailsService, ngToast, $routeParams, $location) {
            $scope.data = {};
            $scope.isLoaded = false;

            if (!$rootScope.loggedInUser) {
                ngToast.warning('You are not allowed to access this page');
                $location.path('/');
                return;
            }

            $scope.newsId = $routeParams.id;

            NewsDetailsService.get({ id: $scope.newsId }).$promise.then(data => {
                $scope.data = data;
                $scope.isLoaded = true;
            }).catch(e => {
                ngToast.danger('There was an error loading the news item');
                console.error(e);
            });

            $scope.save = function () {
                NewsDetailsService.save($scope.data).$promise.then(
                    function () {
                        ngToast.create('Saved !');
                        $location.path('/article/' + $scope.newsId);
                    }
                ).catch(
                    function (e) {
                        console.error(e);
                        ngToast.danger('It didn\'t work, come back later');
                    }
                )
            };

            /**
             * INFO: This helper method fixes the connection between summernote and the form validation
             */
            $scope.onBodyChanged = function () {
                $scope.editForm.body.$setTouched();
            };
        }
    ]);
