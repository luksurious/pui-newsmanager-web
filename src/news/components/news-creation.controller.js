angular.module('news.app')
    .controller('NewsCreateController', function ($scope, NewsDetailsService, ngToast, $routeParams) {
        $scope.data = {};
        $scope.fakeBody = '';

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
