(function(){
    angular.module("app").directive ( "myHeader", function() {
        return {
            restrict: "E",
            templateUrl: "/app/myHeader/myHeader.html",
            controller: function ( $scope, breadcrumbs, AuthService ){
                var vm = this;
                vm.breadcrumbs = breadcrumbs;
                vm.isLoggedIn = isLoggedIn;             //()
                vm.logOut = logOut;                     //()

                /******************/

                function isLoggedIn () {
                    return AuthService.isLoggedIn();
                }

                function logOut () {
                    AuthService.logOut();
                }
            },
            controllerAs: "head"
        };
    });
})();
