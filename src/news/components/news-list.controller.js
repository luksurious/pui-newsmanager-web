angular.module('news.app')
    .controller('NewsListController', function ($scope, $routeParams, NewsListService) {
        $scope.data = [];
        
        $scope.newsFilter = {};
        if ($routeParams.category) {
            $scope.newsFilter.category = $routeParams.category;
        }

        NewsListService.query().$promise.then(data => {
            $scope.data = data;
        }).catch(e => {
            console.log(e);
        });
    });