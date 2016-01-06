(function(){
    angular.module ( "app" ).controller ( "gateway.controller", function( GatewayList, AuthService ) {

        var vm = this;
        vm.edit = {
            mode: 'display',
            disable : false
        };

        vm.section = 0;
        vm.chapter = 0;
        vm.task = 0;
        vm.selectSection = selectSection;       // ( sec )
        vm.selectChapter = selectChapter;

        vm.tempForm = {};                           // Temporary
        vm.problemList = [];

        vm.editProblem = editProblem;           // ($index)
        vm.saveProblem = saveProblem;           // ()
        vm.addProblem = addProblem;             // ()
        vm.deleteProblem = deleteProblem;       // (_id,$index)
        vm.isLoggedIn = AuthService.isLoggedIn;
        vm.isSelected = isSelected;                     // (table,row)

        /**********************Implementation**************************/

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

        function isSelected ( table, row ) {
            var res = "selected";
            if ( table === 1 && vm.section === row ) return res;
            else if ( table === 2 && vm.chapter === row ) return res;
            else if ( table === 3 && vm.task === row ) return res;
            else return "";
        }

        function selectSection ( sec ) {
            vm.section = sec;
            vm.chapter = 0;
        }
        function selectChapter ( ch ) {
            vm.chapter = ch;
            getProblemList();
        }

        function getProblemList(){
            vm.problemList = [];

            // To display all problems
            
            // GatewayList.getAllProblemsAsync().then( function ( response ) {
            //     vm.problemList = response.data;
            // }, function ( error) {
            //     console.log( error );
            // })

            GatewayList.getProblemsAsync( vm.section, vm.chapter ).then( function ( response ) {
                vm.problemList = response.data;
            }, function ( error) {
                console.log( error );
            })
        }
    });
})();
