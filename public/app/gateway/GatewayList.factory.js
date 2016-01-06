(function(){

    angular.module("app").factory ( "GatewayList", function( $http ) {

        var service = {
            getProblemsAsync: getProblemsAsync,
            insertProblemAsync: insertProblemAsync,             //(form)
            editProblemAsync: editProblemAsync,
            deleteProblemAsync : deleteProblemAsync,
            getAllProblemsAsync: getAllProblemsAsync
        }

        return service;

        /***********Implementation***********************/
        function getAllProblemsAsync () {
            return $http.get ( "/api/gateway" );
        }
        function getProblemsAsync ( section, chapter ) {
            return $http.get ( "/api/gateway/" + section + "/" + chapter );
        }
        function insertProblemAsync ( form ) {
            return $http.post ( "/api/auth/gateway", form );
        }
        function editProblemAsync ( form ) {
            return $http.post ( "/api/auth/gateway/"+form._id, form );
        }
        function deleteProblemAsync ( id ) {
            return $http.delete ( "/api/auth/gateway/" + id );
        }
    });

})();
