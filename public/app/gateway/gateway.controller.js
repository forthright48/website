(function(){
    angular.module ( "app" ).controller ( "gateway.controller", function( GatewayList ) {

        var vm = this;
        vm.edit = {
            mode: false,
            disable : false
        };
        vm.tempForm = {};                           // Temporary
        vm.problemList = [];

        vm.editProblem = editProblem;           // (index)
        vm.saveProblem = saveProblem;           // ()
        vm.addProblem = addProblem;             // ()
        vm.deleteProblem = deleteProblem;

        activate();
        /**********************Implementation**************************/
        function activate() {
            GatewayList.getProblemsAsync().then( function ( response ) {
                vm.problemList = response.data;
            }, function ( error) {
                console.log( error );
            })
        }

        function editProblem ( ind ) {
            vm.edit.prob = vm.problemList[ind];
            vm.edit.index = ind;
            vm.edit.mode = true;
        }

        function saveProblem () {
            vm.problemList[vm.edit.index] = vm.edit.prob;
            vm.edit.mode = false;
        }

        function addProblem() {
            vm.disable = true;
            GatewayList.insertProblemAsync ( vm.tempForm ).then(function(response){
                vm.problemList.push ( response.data );
                vm.tempForm = {};
                vm.disable = false;
            },function(error){
                vm.tempForm = {};
                console.log(error);
                vm.disable = false;
            })
        }

        function deleteProblem ( id, index ) {
            if ( confirm ( "Are you sure?" ) == false ) return;

            GatewayList.deleteProblemAsync ( id ).then ( function ( response ) {
                vm.problemList.splice ( index, 1 );
            }, function ( err ) {
                console.log ( err );
            });
        }
    });
})();
