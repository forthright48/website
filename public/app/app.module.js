(function(){
    var app = angular.module ( "app", ["ngRoute", "ng-breadcrumbs"] );

    app
    .config ( function ( $routeProvider, $httpProvider) {
        $routeProvider
        .when( "/", {
            controller: "main.controller",
            controllerAs: "main",
            templateUrl: "app/main/main.html",
            label: "Home"
        })
        .when ( "/psetting", {
            controller: "psetting.controller",
            controllerAs: "pset",
            templateUrl: "/app/psetting/psetting.html",
            label: "Problem Setting"
        })
        .when ( "/login", {
            templateUrl: "/app/login/login.html",
            controller: "login.controller",
            controllerAs: "login",
            label: "Login"
        })
        .otherwise ( {
            redirectTo: "/"
        });
    });
    
    app
    .factory ( "ProblemList", function( $http ) {

        var service = {
            getProblemsAsync: function() {
                return $http.get ( "/api/psetting");
            },
            insertProblemAsync: function( form ) {
                return $http.post ( "/api/auth/psetting", form );
            },
            deleteProblemAsync : function ( id ) {
                return $http.delete ( "/api/auth/psetting/" + id );
            }
        }

        return service;
    })
    .factory ( "AuthService", function ( $window ){
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

    app.factory('authInterceptor', function ( $window, AuthService ) {
        return {
            request: function (config) {

                config.headers = config.headers || {};
                if (AuthService.getToken) {
                    config.headers.Authorization = "Bearer " + AuthService.getToken();
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // Not Authorized
                }
                return response || $q.when(response);
            }
        };
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

})();
