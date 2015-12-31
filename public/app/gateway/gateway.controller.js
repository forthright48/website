(function(){
    angular.module ( "app" ).controller ( "gateway.controller", function( GatewayList, AuthService ) {

        var vm = this;
        vm.edit = {
            mode: 'display',
            disable : false
        };
        vm.tempForm = {};                           // Temporary
        vm.problemList = [];

        vm.editProblem = editProblem;           // ($index)
        vm.saveProblem = saveProblem;           // ()
        vm.addProblem = addProblem;             // ()
        vm.deleteProblem = deleteProblem;       // (_id,$index)
        vm.isLoggedIn = AuthService.isLoggedIn;

        activate();
        /**********************Implementation**************************/
        function activate() {
            GatewayList.getProblemsAsync().then( function ( response ) {
                vm.problemList = response.data;
            }, function ( error) {
                console.log( error );
            })
        }

        function editProblem ( prob ) {
            vm.edit.prob = prob;
            vm.edit.index = vm.problemList.indexOf(prob);
            vm.edit.mode = 'editProblem';
        }

        function saveProblem () {
            vm.problemList[vm.edit.index] = vm.edit.prob;
            vm.edit.mode = 'display';
            vm.disable = true;

            GatewayList.editProblemAsync ( vm.edit.prob ).then ( function ( response ) {
                    if ( response.data.error ) console.log ( response.data.error );
                    vm.disable = false;
            }, function ( err ) {
                    console.log ( err );
                    vm.disable = false;
            });
        }

        function addProblem() {
            vm.disable = true;
            GatewayList.insertProblemAsync ( vm.tempForm ).then(function(response){
                vm.problemList.push ( response.data );
                vm.tempForm = {};
                vm.disable = false;
                vm.showInsertForm = false;
            },function(error){
                vm.tempForm = {};
                console.log(error);
                vm.disable = false;
                vm.showInsertForm = false;
            })
        }

        function deleteProblem ( prob ) {
            var index = vm.problemList.indexOf ( prob );
            if ( confirm ( "Are you sure?" ) == false ) return;

            GatewayList.deleteProblemAsync ( prob._id ).then ( function ( response ) {
                vm.problemList.splice ( index, 1 );
            }, function ( err ) {
                console.log ( err );
            });
        }
    });
})();
