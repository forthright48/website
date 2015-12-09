(function(){
    angular.module("app").factory ( "AuthService", function ( $window ){
        var auth = {};

        auth.saveToken = function ( token ) {
            $window.localStorage['jwtToken'] = token;
        }

        auth.getToken = function () {
            return $window.localStorage['jwtToken'];
        }

        auth.logOut = function ( token ) {
            $window.localStorage['jwtToken'] = "";
        }

        return auth;
    });
})();
