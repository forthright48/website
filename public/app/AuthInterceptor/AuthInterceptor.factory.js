(function(){
    angular.module("app").factory('authInterceptor', function ( $window, AuthService ) {
        return {
            request: function (config) {

                config.headers = config.headers || {};
                if (AuthService.getToken) {
                    config.headers.Authorization = "Bearer " + AuthService.getToken();
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
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

})();
