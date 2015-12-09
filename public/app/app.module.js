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
            templateUrl: "/partials/login.html",
            controller: "loginCtrl",
            controllerAs: "log",
            label: "Login"
        })
        .otherwise ( {
            redirectTo: "/"
        });
    });

    app
    .controller ( "headerCtrl", function ( $scope, breadcrumbs){
        var vm = this;
        vm.breadcrumbs = breadcrumbs;
    })
    .controller ( "loginCtrl", function( $http, AuthService ){
        var vm = this;
        vm.form = {};
        vm.disable = 0;

        vm.register = function() {
            vm.disable = 1;
            $http.post ( "/api/register", vm.form )
            .then ( function(data){
                vm.disable = 0;
                vm.form = {};
                console.log ( "Register Successful" );
            }, function(data){
                vm.disable = 0;
                vm.form = {};
                console.log ( "Register Fail" );
            });
        }

        vm.login = function() {
            vm.disable = 1;
            $http.post ( "/api/login", vm.form )
            .then ( function(response){
                vm.disable = 0;
                vm.form = {};

                if ( response.data.success ) {
                    AuthService.saveToken ( response.data.token );
                }
                else console.log ( response.data.msg );

            }, function(data){
                vm.disable = 0;
                vm.form = {};
                console.log ( "Login Fail" );
            });
        }
    });

    app.directive ( "customHeader", function() {
        return {
            restrict: "E",
            templateUrl: "/partials/customHeader.html",
            controller: "headerCtrl",
            controllerAs: "head"
        };
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
