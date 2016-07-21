(function () {
    'use strict';

    angular
        .module('rdu.ui.home')
        .controller('HomeCtrl', [
            '$rootScope',
            '$timeout',
            'DBFileApi',
            'StateApi',
            HomeCtrl
        ])
        .controller('HomeDownloadCtrl', [
            '$rootScope',
            '$location',
            HomeDownloadCtrl
        ])
        .controller('HomeMediaCtrl', [
            '$rootScope',
            '$location',
            HomeMediaCtrl
        ]);



    function HomeCtrl($rootScope, $timeout, DBFileApi, StateApi) {
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

        function getDropboxFiles() {
            DBFileApi.get(null).$promise
                .then(function (files) {
                    if (files.length > 0) {
                        vm.db.hasImage = true;
                        angular.forEach(files,
                            function (file) {
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

            vm.db = {
                hasImage: false,
                files: [],
                seemore: '#events'
            };

            vm.logo = {
                path: '/images/home/logo/',
                sponsors: StateApi.getSponsors(),
                supports: StateApi.getSupports()
            };

            getDropboxFiles();

            angular.element(document).ready(function () {
                $timeout(initCarousel, 100);
            });

        }


    }

    function HomeDownloadCtrl($rootScope, $location) {
        var vm = this;

        init();

        function init() {

        }
    }

    function HomeMediaCtrl($rootScope, $location) {
        var vm = this;

        init();

        function init() {

        }
    }

} ());