(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('HomeCtrl', [
            '$rootScope',
            '$timeout',
            'DBFileApi',
            HomeCtrl
        ]);

    function HomeCtrl($rootScope, $timeout, DBFileApi) {
        var vm = this;
        vm.db = {
            hasImage: false,
            files: [],
            seemore: '#events'
        }

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

        function getDropboxFiles() {
            DBFileApi.get(null).$promise
                .then(function(files) {
                    if (files.length > 0) {
                        vm.db.hasImage = true;
                        angular.forEach(files,
                            function(file) {
                                if (!/seemore/ig.test(file.name)) {
                                    vm.db.files.push(file);
                                } else {
                                    vm.db.seemore = file.urlLink;
                                }
                            })
                    }
                });
        }

        function init() {

            getDropboxFiles();

            angular.element(document).ready(function() {
                $timeout(initCarousel, 100);
            });

        }


    }

}());