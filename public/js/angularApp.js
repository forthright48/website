(function(){
    var app = angular.module ( "app", ["ngRoute", "ng-breadcrumbs"] );

    app.config ( function ( $routeProvider) {
        $routeProvider
            .when( "/", {
                controller: "mainCtrl",
                controllerAs: "main",
                templateUrl: "/partials/frontPage.html",
                label: "Home"
            })
            .when ( "/psetting", {
                controller: "psettingCtrl",
                controllerAs: "pset",
                templateUrl: "/partials/psetting.html",
                label: "Problem Setting"
            })
            .otherwise ( {
                redirectTo: "/"
            })
    });

    app.controller ( "mainCtrl", function() {
        var state = 0;
        var vm = this;
        vm.changeState = function ( x ) {
            state = x;
        }
        vm.getState = function(x) {
            return state;
        }
    })
    .controller ( "headerCtrl", function ( $scope, breadcrumbs){
        var vm = this;
        vm.breadcrumbs = breadcrumbs;
    })
    .controller ( "psettingCtrl", function ( ){
        var vm = this;
    })

    app.directive ( "customHeader", function() {
        return {
            restrict: "E",
            templateUrl: "/partials/customHeader.html",
            controller: "headerCtrl",
            controllerAs: "head"
        };
    });
})();
