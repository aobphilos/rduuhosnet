(function () {
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
            .when('/contactus', {
                controller: 'ContactUsCtrl',
                controllerAs: 'ctrl',
                templateUrl: '/js/app/templates/contactus/index.html',
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


        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.common = {};
        }
        $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        // $httpProvider.defaults.headers.common["Pragma"] = "no-cache";
    }

    function RDURun(
        $location,
        $rootScope
    ) {

        var current = {
            page: {}
        };
        $rootScope.current = current;


        $rootScope.$on('$routeChangeStart', routeChangeStart);
        $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

        function routeChangeStart(event, next, current) {
            if (next.$$route && current) {

                var path = next.$$route.originalPath;

                if (path == "") {
                    event.preventDefault();
                } else {

                }
            }

        }

        function routeChangeSuccess(event, current, previous) {

            if (!current.$$route) return;

            var regexp = current.$$route.regexp;
            var current = {
                page: {
                    isHome: regexp.test('/'),
                    isAboutUs: regexp.test('/aboutus'),
                    isKnowledgePeople: regexp.test('/knowledge/people'),
                    isKnowledgeHealthCare: regexp.test('/knowledge/healthcare'),
                    isMember: regexp.test('/member'),
                    isContactUs: regexp.test('/contactus'),
                }
            };

            angular.extend($rootScope.current, current);

        }

    }



}());