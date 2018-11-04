angular.module('news.app')
    .controller('NewsListController', ['$scope', '$routeParams', '$route', 'ngToast', 'NewsListService', 'NewsDetailsService',
        function ($scope, $routeParams, $route, ngToast, NewsListService, NewsDetailsService) {
            $scope.data = [];

            $scope.isLoaded = false;
            $scope.isSearch = false;
            $scope.isCategoryView = false;
            
            $scope.newsFilter = {};
            if ($routeParams.category) {
                $scope.newsFilter.category = $routeParams.category;
                $scope.isCategoryView = true;
            } else if ($routeParams.searchTerm) {
                $scope.newsFilter = function (news) {
                    return (news.title + news.subtitle + news.body + news.abstract + news.category).indexOf($routeParams.searchTerm) > -1;
                };
                $scope.isSearch = $routeParams.searchTerm;
            }

            NewsListService.query().$promise.then(data => {
                $scope.data = data;
                $scope.isLoaded = true;
            }).catch(e => {
                ngToast.danger('An error occurred loading the news data');
                console.error(e);
            });

            $scope.deleteNews = function (news) {
                if (!confirm(`Are you sure you want to delete the news item ${news.title}?`)) {
                    return;
                }
                NewsDetailsService.delete({id: news.id}).$promise.then(() => {
                    ngToast.success('Successfully deleted news ' + news.title);
                    $route.reload();
                })
                .catch((err) => {
                    ngToast.danger('There was an error deleting the news item');
                    console.error(err);
                });
            };
        }
    ]);
