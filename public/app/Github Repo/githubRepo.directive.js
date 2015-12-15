(function(){
    angular.module("app").directive( "githubRepo", function(){
        return {
            restrict: "E",
            controller: function( $attrs ) {
                console.log ( $attrs.gitLink );
            }
        }
    });
})();
