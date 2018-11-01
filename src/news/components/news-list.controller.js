angular.module('news.app')
    .controller('NewsListController', function ($scope, $routeParams, $route, ngToast, NewsListService, NewsDetailsService) {
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

        $scope.deleteNews = function (news) {
            if (!confirm(`Are you sure you want to delete the news item ${news.title}?`)) {
                return;
            }
            NewsDetailsService.delete({id: news.id}).$promise.then(function () {
                ngToast.success('Successfully deleted news ' + news.title);
                $route.reload();
            })
            .catch(function (err) {
                ngToast.danger('There was an error deleting the news item');
                console.error(err);
            });
        };
    });