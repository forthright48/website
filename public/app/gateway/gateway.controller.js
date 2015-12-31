(function(){
    angular.module ( "app" ).controller ( "gateway.controller", function( GatewayList ) {

        var vm = this;
        vm.edit = {
            mode: false
        };

        vm.problemList = GatewayList.problemList;

        vm.editProblem = editProblem;
        vm.saveProblem = saveProblem;


        /**********************Implementation**************************/

        function editProblem ( ind ) {
            vm.edit.prob = vm.problemList[ind];
            vm.edit.index = ind;
            vm.edit.mode = true;
        }

        function saveProblem () {
            vm.problemList[vm.edit.index] = vm.edit.prob;
            vm.edit.mode = false;
        }
    });
})();
