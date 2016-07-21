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
            '$mdThemingProvider',
            '$mdIconProvider',
            RDUConfig
        ])
        .run([
            '$location',
            '$rootScope',
            RDURun
        ]);


    function RDUConfig(
        $routeProvider,
        $resourceProvider,
        $httpProvider,
        $mdThemingProvider,
        $mdIconProvider
    ) {

        // Route
        $routeProvider
            .when('/aboutus', {
                controller: 'AboutUsCtrl',
                controllerAs: 'ctrl',
                templateUrl: '/js/app/templates/aboutus/index.html',
                caseInsensitiveMatch: true
            })
            .otherwise({
                redirectTo: '/'
            });

        // Theme
        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                // use shade 100 for the <code>md-hue-1</code> class
                'hue-1': '100',
                // use shade 600 for the <code>md-hue-2</code> class
                'hue-2': '500',
                // use shade A100 for the <code>md-hue-3</code> class
                'hue-3': 'A200'
            })
            // If you specify less than all of the keys, 
            // it will inherit from the
            // default shades
            .accentPalette('purple');

    }

    function RDURun(
        $location,
        $rootScope
    ) {

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
                            isAuthen: true
                        };

                        if (!user.isAuthen) {
                            event.preventDefault();
                            $location.path('/login');
                        } else {



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