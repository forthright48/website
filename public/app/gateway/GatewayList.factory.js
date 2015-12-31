(function(){

    angular.module("app").factory ( "GatewayList", function( ) {

        var problemList = [
            {
                name: "A+B",
                oj: "CodeForces",
                link: "https://codeforces.com/somelink",
                pid: "001"
            },
            {
                name: "Hello World",
                oj: "UVa",
                link: "https://codeforces.com/somelink",
                pid: "12545"
            },
            {
                name: "No No No",
                oj: "SPOJ",
                link: "https://codeforces.com/somelink",
                pid: "NONONO"
            }
        ];

        var service = {
            problemList: problemList
        }

        return service;
    });

})();
