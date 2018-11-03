function NewsLoginController($scope, $rootScope, $http, ngToast, LoginService, config) {

    this.$onInit = function () {
        $scope.hasLoginError = false;
        reset();
    };

    function reset() {
        $scope.username = "";
        $scope.password = "";
    }

    $scope.login = function () {
        LoginService.login({ passwd: $scope.password, username: $scope.username }).$promise.then(data => {
            $rootScope.loggedInUser = data;
            $http.defaults.headers.common['Authorization'] = data.Authorization + ' apikey=' + data.apikey;

            let $loginModal = $('#loginModal');
            $loginModal.on('hidden.bs.modal', function () {
                reset();

                $scope.hasLoginError = false;
                $scope.loginForm.$setPristine();
                $scope.loginForm.$setUntouched();
            });
            $loginModal.modal('hide');
            ngToast.success('Logged in successfully');
        }).catch(e => {
            console.log(e);
            $scope.hasLoginError = true;
        });
    };

    $scope.logout = function () {
        $rootScope.loggedInUser = null;
        $http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=' + config.apiKey;
        
        $('#logoutModal').modal('hide');
        ngToast.success('Logged out successfully');
    };
}

NewsLoginController.$inject = ['$scope', '$rootScope', '$http', 'ngToast', 'LoginService', 'config'];

export default NewsLoginController;