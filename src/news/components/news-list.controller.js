angular.module('news.app')
    .controller('NewsListController', function ($scope, NewsListService) {
        $scope.data = {};
        
        NewsListService.query().$promise.then(data => {
            $scope.data = data;
        })
        .catch(e => {
            console.log(e);
        });
    });