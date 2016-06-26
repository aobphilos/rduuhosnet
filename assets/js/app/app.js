(function() {
    'use strict';

    angular
        .module('rdu', [
            'rdu.core',
            'rdu.ui'
        ])
        .config([
            '$routeProvider',
            '$resourceProvider',
            '$httpProvider',
            RDUConfig
        ])
        .run([
            '$location',
            '$rootScope',
            RDURun
        ]);


    function RDUConfig($routeProvider, $resourceProvider, $httpProvider) {

        $routeProvider
            .when('/', {
                controller: 'HomeCtrl',
                controllerAs: 'ctrl',
                templateUrl: '/js/app/templates/home/index.html',
                caseInsensitiveMatch: true
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function RDURun($location, $rootScope) {

        $rootScope.$on('$routeChangeStart', routeChangeStart);
        $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

        function routeChangeStart(event, next, current) {
            if (next.$$route && current) {

                var path = next.$$route.originalPath;

                if (path == "") {
                    event.preventDefault();
                } else {

                    if (path != "/login") {

                        var user = {
                            isAuthen: false
                        };

                        if (!user.isAuthen) {
                            event.preventDefault();
                            $location.path('/login');
                        } else {

                            if (path != "/401") {
                                if (!GroupContext.hasView(next.$$route.regexp)) {
                                    event.preventDefault();
                                    $location.path('/401');
                                }
                            }

                        }

                    }
                }
            }

        }

        function routeChangeSuccess(event, current, previous) {

            if (!current.$$route) return;

            var isLoginPage = current.$$route.regexp.test('/login');

        }
    }

}());