(function(){
    angular.module("app").directive( "githubRepo", function( $compile, $timeout ){
        return {
            restrict: "E",
            controller: function( $attrs, $routeParams, $http, marked ) {
                var vm = this;

                ///Use this git link to extract the file mentioned in path
                var filePath = $routeParams.filePath;

                // Build github api link
                var link = "";
                if ( filePath == 'readme') link = "https://api.github.com/repos/" + $attrs.gitLink + "/" + filePath;
                else link = "https://api.github.com/repos/" + $attrs.gitLink + "/contents/" + filePath;


                // Call github api for content
                $http.get ( link ).then ( function(res){
                    vm.data = marked ( atob ( res.data.content ) );
                }, function ( err ) {
                    console.log(err);
                });
            },
            controllerAs: "git",
            bindToController: true,
            link: function ( scope, ele, attrs, ctrl ) {

                // Watch git.data as it gets changed by api call to github
                scope.$watch ( "git.data", function ( newVal, oldVal ) {
                    // Add the github data to github-repo element
                    $("github-repo").html( $compile( ctrl.data )(scope) );
                    // Render new math
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                });
            }
        }


    });
})();
