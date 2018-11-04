angular.module('news.app')
    .controller('NewsDetailController', ['$scope', '$routeParams', 'ngToast', 'NewsDetailsService', 'NewsUserResolver',
        function ($scope, $routeParams, ngToast, NewsDetailsService, NewsUserResolver) {
            $scope.data = {};
            $scope.isLoaded = false;

            $scope.newsId = $routeParams.id;
            
            NewsDetailsService.get({id: $scope.newsId}).$promise.then(data => {
                data.username = NewsUserResolver(data.id_user);
                data.update_date = new Date(data.update_date);
                
                $scope.data = data;
                $scope.isLoaded = true;
            }).catch(e => {
                ngToast.danger('There was an error loading the news item');
                console.error(e);
            });
        }
    ]);