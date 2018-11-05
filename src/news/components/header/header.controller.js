/**
 * INFO: This controller is not directly tied to Angular.
 * That way it can easily be imported in another file, instead of requiring it.
 */
function HeaderController($scope, $location, $rootScope) {
    $scope.newsSearch = '';

    $scope.searchSubmit = function () {
        $location.path(`/search/${encodeURIComponent($scope.newsSearch)}`);
    }

    $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
        /**
         * INFO: remove the search field value if we leave the search page
         */
        if (currentRoute.originalPath.indexOf('/search') === -1) {
            $scope.newsSearch = '';
        }
    });
}

HeaderController.$inject = ['$scope', '$location', '$rootScope'];

export default HeaderController;