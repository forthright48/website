(function(){
    angular.module ( "app" ).factory( "TOCService", function() {
        var TOC = {
            insertTOC: insertTOC               // (html)
        }
        return TOC;

        /*************** Implementation *********************/

        function insertTOC ( html ) {
            // Without this div, jquery doesn't work
            html = "<div>" + html + "</div>";
            html = $(html);         // Convert to jquer dom object

            var toc =   "<div><h1>Table of Contents</h1>" + "<ul>";
            $("h1", html ).each( function() {
                toc += "<li><a ng-click='learn.scrollTo("  + "\"" + this.id + "\"" + ")'>" + this.innerText + "</a></li>";
            });
            toc +=      "</ul></div>";

            html.prepend( toc );

            return html.html();
        }
    });
})();
