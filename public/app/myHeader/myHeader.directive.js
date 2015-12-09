(function(){
    angular.module("app").directive ( "myHeader", function() {
        return {
            restrict: "E",
            templateUrl: "/app/myHeader/myHeader.html",
            controller: function ( $scope, breadcrumbs ){
                var vm = this;
                vm.breadcrumbs = breadcrumbs;
            },
            controllerAs: "head"
        };
    });
})();
