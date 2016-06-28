(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('HomeCtrl', [
            '$rootScope',
            '$timeout',
            HomeCtrl
        ]);

    function HomeCtrl($rootScope, $timeout) {
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
                        center: false
                    },
                    600: {
                        items: 2,
                        center: false,
                    },
                    960: {
                        items: 3
                    }
                }
            });
        }

        function init() {

            angular.element(document).ready(function() {
                $timeout(initCarousel, 100);
            });

        }


    }

}());