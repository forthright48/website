(function(){
    angular.module ( "app" ).controller ( "main.controller", function() {
        var state = 0;
        var vm = this;
        vm.changeState = function ( x ) {
            state = x;
        }
        vm.getState = function(x) {
            return state;
        }
    });

})();
