function HeaderController($scope, $location, $rootScope) {
    $scope.newsSearch = '';

    $scope.searchSubmit = function () {
        $location.path(`/search/${encodeURIComponent($scope.newsSearch)}`);
    }

    $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
        if (currentRoute.originalPath.indexOf('/search') === -1) {
            $scope.newsSearch = '';
        }
    });
}

HeaderController.$inject = ['$scope', '$location', '$rootScope'];

export default HeaderController;