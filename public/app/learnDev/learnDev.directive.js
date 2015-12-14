(function(){
    angular.module ( "app" ).directive ( "learnDev", function() {
        return {
            restrict: "E",
            templateUrl: "/app/learnDev/learnDev.html",
            controller: function( $http, marked, $location, TOCService, $sce ){
                var vm = this;

                vm.data = "";
                vm.scrollTo = scrollTo;
                vm.basePath = "#" + $location.path();
                vm.scrollTo = scrollTo;


                activate();

                /**************Implementation**************/

                function activate () {
                    console.log ( "activates" );
                    $http.get ( "https://api.github.com/repos/forthright48/learnDev/readme" ).then ( function( res ){
                        vm.data = $sce.trustAsHtml( TOCService.insertTOC( marked ( atob ( res.data.content ) ) ) );
                    }, function(err){
                        vm.data = "Something Wrong";
                    });
                }

                function scrollTo () {
                    console.log ( "yo" );
                }
            },
            controllerAs: "learn"
        }
    })
})();
