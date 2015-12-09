(function(){
    angular.module("app").factory('AuthInterceptor', function ( $window, $q ) {
        return {
            request: function (config) {

                config.headers = config.headers || {};
                if ($window.localStorage['jwtToken']) {
                    config.headers.Authorization = "Bearer " + $window.localStorage['jwtToken'];
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // Not Authorized
                }
                return response || $q.when(response);
            }
        };
    });

    angular.module("app").config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });

})();
