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
            'GApi', 'GAuth',
            'GData',
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
            .when('/', {
                controller: 'HomeCtrl',
                controllerAs: 'ctrl',
                templateUrl: '/js/app/templates/home/index.html',
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
        $rootScope,
        GApi, GAuth,
        GData
    ) {

        AuthenGoogle(GApi, GAuth, GData, $rootScope);

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

    function AuthenGoogle(GApi, GAuth, GData, $rootScope) {

        $rootScope.gdata = GData;

        var CLIENT = '792419785746-94spd1m00hvacioa102u0950ak22lr5r.apps.googleusercontent.com';
        var SCOPE = [
            'https://www.googleapis.com/auth/drive.metadata',
            'https://www.googleapis.com/auth/drive.metadata.readonly',
            'https://www.googleapis.com/auth/drive.photos.readonly',
            'https://www.googleapis.com/auth/drive.readonly'
        ];

        GAuth.setClient(CLIENT);
        GAuth.setScope(SCOPE.join(' ')); // default scope is only https://www.googleapis.com/auth/userinfo.email

        GApi.load('drive', 'v3').then(function(resp) {
            console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');
        });
    }

}());