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
    .controller ( "psettingCtrl", function ( ProblemList ){
        var vm = this;
        vm.problems = [];

        vm.disable = 0;

        ProblemList.getProblemsAsync()
            .then ( function( response) {
                vm.problems = response.data;
            }, function ( response ) {
                console.log ( response );
            });


        vm.insertProblem = function () {
            vm.disable = 1;
            ProblemList.insertProblemAsync ( vm.form )
                .then ( function ( response) {
                    vm.form = {};
                    vm.disable = 0;
                    vm.problems.push ( response.data );
                }, function ( response ) {
                    console.log ( response );
                });
        }

        vm.deleteProblem = function ( id, index ) {
            if ( confirm ( "Are you sure?" ) == false ) return;

            console.log ( id, index );

            ProblemList.deleteProblemAsync ( id )
                .then ( function ( response ) {
                    vm.problems.splice ( index, 1 );
                }, function ( response ) { console.log ( response ); } );
        }
    })

    app.directive ( "customHeader", function() {
        return {
            restrict: "E",
            templateUrl: "/partials/customHeader.html",
            controller: "headerCtrl",
            controllerAs: "head"
        };
    });

    app.factory ( "ProblemList", function( $http ) {

        var service = {
            getProblemsAsync: function() {
                return $http.get ( "/api/psetting");
            },
            insertProblemAsync: function( form ) {
                return $http.post ( "/api/psetting", form );
            },
            deleteProblemAsync : function ( id ) {
                return $http.delete ( "/api/psetting/" + id );
            }
        }

        return service;
    })
})();
