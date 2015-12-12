(function(){
    var app = angular.module ( "app", ["ngRoute", "ng-breadcrumbs", "ng-showdown"] );

    app.config ( function ( $routeProvider, $httpProvider) {
        $routeProvider.when( "/", {
            controller: "main.controller",
            controllerAs: "main",
            templateUrl: "/app/main/main.html",
            label: "home"
        })
        .when ( "/psetting", {
            controller: "psetting.controller",
            controllerAs: "pset",
            templateUrl: "/app/psetting/psetting.html",
            label: "pset"
        })
        .when ( "/login", {
            templateUrl: "/app/login/login.html",
            controller: "login.controller",
            controllerAs: "login",
            label: "login"
        })
        .when ( "/learnDev", {
            templateUrl: "app/learnDev/learnDev.html",
            controller: "learnDev.controller",
            controllerAs: "learn",
            label: "learn"
        })
        .otherwise ( {
            redirectTo: "/"
        });
    });

})();
