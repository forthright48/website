(function(){
    angular.module("app").factory ( "AuthService", function ( $window, $q, $http ) {
        var loggedIn = false;

        var auth = {};

        auth.isLoggedIn = function() {
            return loggedIn;
        }

        auth.loginAsync = function ( form ) {
            var defer = $q.defer();
            $http.post ( "/api/login", form ).then( function( response ){
                if ( response.data.success ) {
                    loggedIn = true;
                    auth.saveToken( response.data.token );
                    defer.resolve ( { success:true } );
                    console.log ( "Logged In" );
                }
                else {
                    console.log ( response.data.msg );
                    defer.reject ( { sucess:false } );
                }
            }, function(response){
                console.log ( "Something wrong with http POST" );
                defer.reject ( { sucess:false } );
            });

            return defer.promise;
        }

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
