(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('HomeCtrl', [
            '$rootScope',
            '$timeout',
            'GApi',
            HomeCtrl
        ]);

    function HomeCtrl($rootScope, $timeout, GApi) {
        var vm = this;

        init();

        function initCarousel() {
            $('.owl-carousel').owlCarousel({
                autoplay: true,
                autoWith: true,
                center: true,
                loop: true,
                margin: 10,
                nav: false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        center: false,
                        nav: false
                    },
                    600: {
                        items: 2,
                        center: false,
                        nav: false
                    },
                    960: {
                        items: 3,
                        center: true,
                        nav: false
                    }
                }
            });
        }

        function init() {

            angular.element(document).ready(function() {
                $timeout(initCarousel, 100);

                // GApi.execute('drive', 'files.list', {
                //     spaces: 'photos',
                //     key: 'AIzaSyC0kHtSun_7swR9mHNmn9bsshr4knXl8r8'
                // }).then(function(resp) {
                //     $scope.value = resp;
                //     console.log('list: ', resp);
                // }, function(err) {
                //     console.log("error :(", err, ")");
                // });

                // $.get('https://www.googleapis.com/drive/v3/files?key=AIzaSyC0kHtSun_7swR9mHNmn9bsshr4knXl8r8', function(result) {
                //     console.log(result);
                // });
            });

        }


    }

}());