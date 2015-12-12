(function(){
    angular.module("app").controller("learnDev.controller", function( $http ){
        var vm = this;

        vm.data = "";

        activate();

        /**************Implementation**************/

        function activate () {
            $http.get ( "https://api.github.com/repos/forthright48/learnDev/readme" ).then ( function( res ){
                vm.data = atob ( res.data.content );
            }, function(err){
                vm.data = "Something Wrong";
            });
        }
    });
})();
