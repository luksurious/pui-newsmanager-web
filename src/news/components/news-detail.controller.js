angular.module('news.app')
    .controller('NewsDetailController', function ($scope, $routeParams, ngToast, NewsDetailsService, NewsUserResolver) {
        $scope.data = {};
        $scope.loaded = false;

        $scope.newsId = $routeParams.id;
        
        NewsDetailsService.get({id: $scope.newsId}).$promise.then(data => {
            data.username = NewsUserResolver(data.id_user);
            data.update_date = new Date(data.update_date);
            
            $scope.data = data;
            $scope.loaded = true;
        })
        .catch(e => {
            ngToast.danger('There was an error loading the news item');
            console.log(e);
        });
    });