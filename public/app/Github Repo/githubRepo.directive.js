(function(){
    angular.module("app").directive( "githubRepo", function(){
        return {
            restrict: "E",
            controller: function( $attrs, $routeParams, $http, marked ) {
                var vm = this;
                console.log ( $attrs.gitLink );

                ///Use this git link to extract the file mentioned in path
                var filePath = $routeParams.filePath;
                vm.data = "";

                // Build github api link
                var link = "";
                if ( filePath == 'readme') link = "https://api.github.com/repos/" + $attrs.gitLink + "/" + filePath;
                else link = "https://api.github.com/repos/" + $attrs.gitLink + "/contents/" + filePath;


                console.log(link);
                $http.get ( link ).then ( function(res){
                    vm.data = marked ( atob ( res.data.content ) );
                }, function ( err ) {
                    console.log(err);
                });
            },
            controllerAs: "git",
            bindToController: true,
            link: function ( scope, ele, attrs, ctrl ) {

                scope.$watch ( "git.data", function ( newVal, oldVal ) {
                    console.log ( "Changed" );

                    $("github-repo").html( ctrl.data );
                });
            }
        }


    });
})();
