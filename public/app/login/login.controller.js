(function(){
    angular.module ( "app" ).controller ( "login.controller", function( $http, AuthService ){
        var vm = this;

        vm.form = {};
        vm.disable = 0;
        vm.register = register;
        vm.login = login;

        /******************** Implementation ************************/

        function register () {
            vm.disable = 1;
            AuthService.registerAsync ( vm.form ).then ( function(data){
                vm.disable = 0;
                vm.form = {};
            }, function(data){
                vm.disable = 0;
                vm.form = {};
            });
        }

        function login () {
            vm.disable = 1;
            AuthService.loginAsync ( vm.form ).then ( function(response){
                vm.disable = 0;
                vm.form = {};
            }, function(data){
                vm.disable = 0;
                vm.form = {};
            });
        }
    });

})();
