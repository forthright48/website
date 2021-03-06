(function(){
    angular.module("app").factory ( "AuthService", function ( $window, $q, $http ) {
        var loggedIn;

        var auth = {
            isLoggedIn: isLoggedIn,         //()
            loginAsync: loginAsync,         //(form)
            registerAsync: registerAsync,   //(form)
            saveToken: saveToken,           //(token)
            getToken: getToken,             //()
            logOut: logOut                  //()
        };

        return auth;

        /******************** Implementation ************************/

        function isLoggedIn () {
            if ( angular.isUndefined(loggedIn) ) {
                loggedIn = false;
                $http.get ( "/api/auth/tokenVerify").then( function( response ){
                    loggedIn = true;
                }, function( response ){
                    logOut();
                });
            }
            return loggedIn;
        };

        function registerAsync ( form ) {
            var defer = $q.defer();

            $http.post ( "/api/register", form ).then( function( response ){
                defer.resolve ( {success: true} );
                console.log ( "Register Successful" );
            }, function( response ){
                defer.resolve ( {success: false} );
                console.log ( response.data.msg );
                console.log ( "Register Fail" );
            });

            return defer.promise;
        }

        function loginAsync ( form ) {
            var defer = $q.defer();
            $http.post ( "/api/login", form ).then( function( response ){
                if ( response.data.success ) {
                    loggedIn = true;
                    auth.saveToken( response.data.token );
                    defer.resolve ( { success:true } );
                    console.log ( "Logged In" );
                }
                else {
                    defer.reject ( { sucess:false } );
                    console.log ( response.data.msg );
                }
            }, function(response){
                defer.reject ( { sucess:false } );
                console.log ( "Something wrong with http POST" );
            });

            return defer.promise;
        };

        function saveToken ( token ) {
            $window.localStorage['jwtToken'] = token;
        };

        function getToken () {
            return $window.localStorage['jwtToken'];
        };

        function logOut ( token ) {
            loggedIn = false;
            $window.localStorage['jwtToken'] = "";
        };

    });

})();
