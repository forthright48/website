(function(){
    var app = angular.module ( "app", ["ngRoute", "ng-breadcrumbs"] );

    app.config ( function ( $routeProvider, $httpProvider) {
        $routeProvider.when( "/", {
            controller: "main.controller",
            controllerAs: "main",
            templateUrl: "/app/main/main.html",
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

})();
