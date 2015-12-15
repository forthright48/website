(function(){
    angular.module ( "app" ).directive ( "learnDev", function( $compile ) {
        return {
            restrict: "E",
            templateUrl: "/app/learnDev/learnDev.html",
            controllerAs: "learn",
            bindToController: true,
            controller: function( $http, marked, TOCService, $location, $anchorScroll ){
                var vm = this;

                vm.data = "";
                vm.scrollTo = scrollTo;         // ($event)

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

                function scrollTo ( id ) {
                    $location.hash(id);
                    $anchorScroll();
                    $location.hash("");
                }
            },
            link: function ( scope, ele, attrs, ctrl ) {

                scope.$watch ( "learn.data", function() { // Add the markdown file to view
                    $(".markdown").prepend($compile(ctrl.data)(scope));
                })
            }
        }
    })
})();
