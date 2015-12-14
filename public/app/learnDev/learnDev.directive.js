(function(){
    angular.module ( "app" ).directive ( "learnDev", function( $compile ) {
        return {
            restrict: "E",
            templateUrl: "/app/learnDev/learnDev.html",
            controller: function( $http, marked, TOCService ){
                var vm = this;

                vm.data = "";
                vm.scrollTo = scrollTo;

                activate();

                /**************Implementation**************/

                function activate () {
                    console.log ( "activates" );
                    $http.get ( "https://api.github.com/repos/forthright48/learnDev/readme" ).then ( function( res ){
                        vm.data = TOCService.insertTOC( marked ( atob ( res.data.content ) ) );
                    }, function(err){
                        vm.data = "Something Wrong";
                    });
                }

                function scrollTo () {
                    console.log ( "yo" );
                }
            },
            controllerAs: "learn",
            bindToController: true,
            link: function ( scope, ele, attrs, ctrl ) {
                scope.$watch ( "learn.data", function() {
                    $(".markdown").prepend($compile(ctrl.data)(scope));
                })
            }
        }
    })
})();
