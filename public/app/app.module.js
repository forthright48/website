(function(){
    var app = angular.module ( "app", ["ngRoute", "ng-breadcrumbs", "hc.marked", "angular-github-repo-display"] );

    app.config ( function ( $routeProvider ) {
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
            template: "<learn-dev> </learn-dev>",
            label: "learn"
        })
        .when ( "/cpps101/:filePath*", {
            templateUrl: "/app/cpps101/cpps101.html",
            label: "cpps101"
        })
        .when ( "/gateway", {
            templateUrl: "/app/gateway/gateway.html",
            label: "gateway"
        })
        .otherwise ( {
            redirectTo: "/"
        });
    });

})();
