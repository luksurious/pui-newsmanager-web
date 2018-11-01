import config from './../config';

function NewsLoginController($scope, $rootScope, $http, LoginService) {

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

            $('#loginModal').modal('hide');
            reset();
        }).catch(e => {
            console.log(e);
            $scope.hasLoginError = true;
        });
    };

    $scope.logout = function () {
        $rootScope.loggedInUser = null;
        $http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=' + config.apiKey;
        
        $('#logoutModal').modal('hide');
    };
}

export default NewsLoginController;