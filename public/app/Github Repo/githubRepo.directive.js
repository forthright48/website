(function(){
    angular.module("app").directive( "githubRepo", function( $compile, $timeout ){
        return {
            restrict: "E",
            controller: function( $attrs, $routeParams, $http, $location, marked ) {
                var vm = this;

                ///Use this git link to extract the file mentioned in path
                var filePath = $routeParams.filePath;
                var base = "/#" + $location.path().slice(0,-(filePath.length+1));

                // Build github api link
                var link = "";
                if ( filePath == 'readme') link = "https://api.github.com/repos/" + $attrs.gitLink + "/" + filePath;
                else link = "https://api.github.com/repos/" + $attrs.gitLink + "/contents/" + filePath;


                // Call github api for content
                $http.get ( link ).then ( function(res){
                    vm.data = addBaseLink ( marked ( atob ( res.data.content ) ), base );
                }, function ( err ) {
                    console.log(err);
                });


                /*******************Implementaion**********************/

                function addBaseLink( html, base ) {
                    html = "<div>" + html + "</div>";

                    html = $(html);

                    // Find all link in the html
                    $("a", html ).each( function(){
                        var href = $(this).attr("href");
                        if (!/^(f|ht)tps?:\/\//i.test(href)) {
                            if ( href[0] != '/' ) href = "/" + href;
                            href = base + href;
                            $(this).attr("href",href);
                            console.log( base, href );
                        }

                    });

                    return html.html();
                }

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
