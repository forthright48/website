(function(){

    angular.module("app").factory ( "ProblemList", function( $http ) {

        var service = {
            getProblemsAsync: function() {
                return $http.get ( "/api/psetting");
            },
            insertProblemAsync: function( form ) {
                return $http.post ( "/api/auth/psetting", form );
            },
            deleteProblemAsync : function ( id ) {
                return $http.delete ( "/api/auth/psetting/" + id );
            }
        }

        return service;
    });

})();
