angular.module('news.app')
    .controller('NewsListController', function ($scope, $routeParams, NewsListService, NewsDetailsService) {
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
            NewsDetailsService.delete({id: news.id}).$promise.then(function (data) {
                console.log('Successfully deleted news #' + news.id);
            })
            .catch(function (err) {
                console.error(err);
            });
        };
    });