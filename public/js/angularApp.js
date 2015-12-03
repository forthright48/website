(function(){
    var app = angular.module ( "app", ["ngRoute"] );

    app.config ( function ( $routeProvider) {
        $routeProvider
            .when( "/", {
                controller: "mainCtrl",
                controllerAs: "main",
                templateUrl: "/partials/frontPage.html"
            })
    });

    app.controller ( "mainCtrl", function() {
        var state = 0;

        this.changeState = function ( x ) {
            state = x;
        }
        this.getState = function(x) {
            return state;
        }
    });

    app.directive ( "customHeader", function() {
        return {
            restrict: "E",
            templateUrl: "/partials/customHeader.html"
        };
    });
})();
