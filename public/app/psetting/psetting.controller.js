(function(){
    angular.module ( "app" ) .controller ( "psetting.controller", function ( ProblemList, AuthService ){
        var vm = this;
        vm.problems = [];
        vm.disable = 0;                         //Disable buttons when editing
        vm.edit = {                             //Edit mode
            mode: 0,
            id: ""
        };

        vm.insertProblem = insertProblem;       //()
        vm.deleteProblem = deleteProblem;       //( id, index )
        vm.startEdit = startEdit;               //( id )
        vm.doneEdit = doneEdit;                 //( problem )
        vm.isLoggedIn = isLoggedIn;             //()

        activate();

        ////////////////////////

        function activate() {

            if ( vm.problems.length == 0 ) { // Populate when array is empty
                ProblemList.getProblemsAsync().then ( function( response) {
                    vm.problems = response.data;
                }, function ( response ) {
                    console.log ( response );
                });
            }
        }

        function insertProblem () {
            vm.disable = 1;
            ProblemList.insertProblemAsync ( vm.form ).then ( function ( response) {
                vm.form = {};
                vm.disable = 0;
                vm.problems.push ( response.data );
            }, function ( response ) {
                vm.form = {};
                vm.disable = 0;
                console.log ( response.data );
            });
        }

        function deleteProblem ( id, index ) {
            if ( confirm ( "Are you sure?" ) == false ) return;

            ProblemList.deleteProblemAsync ( id ).then ( function ( response ) {
                vm.problems.splice ( index, 1 );
            }, function ( err ) {
                console.log ( err );
            });
        }

        function startEdit ( id ) {
            vm.edit.mode = 1;
            vm.edit.id = id;
        }

        function doneEdit ( problem ) {
            vm.edit.mode = 0;
            vm.edit.id = "";

            ProblemList.editProblemAsync ( problem ).then ( function ( response ) {
                    if ( response.data.error ) console.log ( response.data.error );
                    else console.log ( response.data.msg );
            }, function ( err ) {
                    console.log ( err );
            });
        }

        function isLoggedIn() {
            return AuthService.isLoggedIn();
        }

    });
})();
