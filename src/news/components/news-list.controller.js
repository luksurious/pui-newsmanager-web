angular.module('news.app')
    .controller('NewsListController', function ($scope, $routeParams, NewsListService) {
        $scope.data = [];

        $scope.isLoaded = false;
        $scope.isSearch = false;
        $scope.isCategoryView = false;
        
        $scope.newsFilter = {};
        if ($routeParams.category) {
            $scope.newsFilter.category = $routeParams.category;
            $scope.isCategoryView = true;
        }
        if ($routeParams.term) {
            $scope.newsFilter = $routeParams.term;
            $scope.isSearch = true;
        }

        NewsListService.query().$promise.then(data => {
            $scope.data = data;
            $scope.isLoaded = true;
        }).catch(e => {
            console.log(e);
        });
    });