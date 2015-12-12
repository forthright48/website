(function(){

    angular.module("app").factory ( "ProblemList", function( $http ) {

        var service = {
            getProblemsAsync: getProblemsAsync,
            insertProblemAsync: insertProblemAsync,
            editProblemAsync: editProblemAsync,
            deleteProblemAsync : deleteProblemAsync
        }

        return service;

        function getProblemsAsync () {
            return $http.get ( "/api/psetting");
        }
        function insertProblemAsync ( form ) {
            return $http.post ( "/api/auth/psetting", form );
        }
        function editProblemAsync ( form ) {
            return $http.post ( "/api/auth/psetting/"+form._id, form );
        }
        function deleteProblemAsync ( id ) {
            return $http.delete ( "/api/auth/psetting/" + id );
        }
    });

})();
