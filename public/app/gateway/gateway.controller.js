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

        activate();
        /**********************Implementation**************************/

        function activate() {
            GatewayList.getChildren("0").then ( function(res){
                vm.sectionList = res.data;
            }, function ( err ) {
                console.log(err);
            })
        }

        function editProblem ( prob ) {
            vm.edit.prob = prob;
            vm.edit.mode = 'editProblem';
        }

        function saveProblem () {
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
            GatewayList.getChildren( sec ).then ( function ( res ) {
                vm.chapterList = res.data;
            }, function ( err) {
                console.log(err);
            })
            vm.chapter = 0;
        }
        function selectChapter ( ch ) {
            vm.chapter = ch;
            GatewayList.getChildren( ch ).then( function ( response ) {
                vm.problemList2 = response.data;
            }, function ( error) {
                console.log( error );
            })
        }

        function getAllProblemList(){
            vm.problemList = [];

            // To display all problems
            GatewayList.getAllProblemsAsync().then( function ( response ) {
                vm.problemList = response.data;
            }, function ( error) {
                console.log( error );
            })
        }
    });
})();
