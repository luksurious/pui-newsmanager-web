angular.module('news.app')
    .controller('NewsEditController', function ($scope, NewsDetailsService, ngToast, $routeParams) {
        $scope.data = {};

        $scope.newsId = $routeParams.id;

        NewsDetailsService.get({id: $scope.newsId}).$promise.then(data => {
            $scope.data = data;
        })
        .catch(e => {
            console.log(e);
        });

        $scope.save = function(){
            NewsDetailsService.save($scope.data).$promise.then(
                function(){
                    ngToast.create('Saved !');
                }
            )
        }
    });

// TODO: manage authentification
