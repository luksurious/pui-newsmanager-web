angular.module('news.app')
    .controller('NewsListController', function ($scope, $routeParams, NewsListService) {
        $scope.data = {};
        
        $scope.categoryFilter = $routeParams.category || "";

        NewsListService.query().$promise.then(data => {
            $scope.data = data;
        })
        .catch(e => {
            console.log(e);
        });
    });