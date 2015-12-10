(function(){
    angular.module ( "app" ) .controller ( "psetting.controller", function ( ProblemList, AuthService ){
        var vm = this;
        vm.problems = [];

        vm.disable = 0;

        ProblemList.getProblemsAsync()
        .then ( function( response) {
            vm.problems = response.data;
        }, function ( response ) {
            console.log ( response );
        });


        vm.insertProblem = function () {
            console.log ( AuthService.getToken() );
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

        vm.deleteProblem = function ( id, index ) {
            if ( confirm ( "Are you sure?" ) == false ) return;

            ProblemList.deleteProblemAsync ( id )
            .then ( function ( response ) {
                vm.problems.splice ( index, 1 );
            }, function ( response ) { console.log ( response ); } );
        }
    });
})();
