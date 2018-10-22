angular.module('news.app')
    .controller('NewsEditController', function ($scope, NewsDetailsService) {
        $scope.data = {};
        
        $scope.newsId = $routeParams.id;
        
        NewsDetailsService.get({id: $scope.newsId}).$promise.then(data => {
            $scope.data = data;
        })
        .catch(e => {
            console.log(e);
        });
    });