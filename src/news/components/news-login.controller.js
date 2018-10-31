function NewsLoginController($scope, $rootScope, LoginService) {
    $scope.username = "";
    $scope.password = "";

    function reset() {
        $scope.username = "";
        $scope.password = "";
    }

    $scope.login = function () {

        LoginService.login({ passwd: $scope.password, username: $scope.username }).$promise.then(data => {
            $rootScope.loggedInUser = data;
            $('#loginModal').modal('hide');
            reset();
        }).catch(e => {
            console.log(e);
        });

    }
}

// {passwd: $scope.password, ​username: $scope.username}

// {Authorization: "PUIRESTAUTH", 
//  apikey: "APIKEYOFTHEUSER", 
//  username: "groman", ...}

export default NewsLoginController;