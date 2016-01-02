(function(){
    angular.module ( "app").directive ( "markdownView", function( $compile, marked ) {
        return {
            restrict: "E",
            controllerAs: "mark",
            bindToController: true,
            link: function ( scope, ele, attrs, ctrl ) {
                var data;
                scope.$watch ( attrs.text, function ( value ) {
                    data = marked ( value );
                })

                scope.$watch ( "data", function ( newVal, oldVal ) {
                    $("markdown-view").html( $compile( data )(scope) );
                    // Render new math
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                });
            }
        }
    })
})();
