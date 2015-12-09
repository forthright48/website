(function(){
    angular.module ( "app" ).controller ( "login.controller", function( $http, AuthService ){
        var vm = this;
        vm.form = {};
        vm.disable = 0;

        vm.register = function() {
            vm.disable = 1;
            $http.post ( "/api/register", vm.form )
            .then ( function(data){
                vm.disable = 0;
                vm.form = {};
                console.log ( "Register Successful" );
            }, function(data){
                vm.disable = 0;
                vm.form = {};
                console.log ( "Register Fail" );
            });
        }

        vm.login = function() {
            vm.disable = 1;
            $http.post ( "/api/login", vm.form )
            .then ( function(response){
                vm.disable = 0;
                vm.form = {};

                if ( response.data.success ) {
                    AuthService.saveToken ( response.data.token );
                }
                else console.log ( response.data.msg );

            }, function(data){
                vm.disable = 0;
                vm.form = {};
                console.log ( "Login Fail" );
            });
        }
    });

})();
