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
            '$sce',
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

    function HomeMediaCtrl($rootScope, $location, $sce) {
        var vm = this;

        vm.media = [
            {
                desc: "สภาวะปัจจุบันของระบบสุขภาพ กับการใช้ยาของผู้ป่วย",
                url: "https://www.youtube.com/embed/o64T7Cac7ts"
            },
            {
                desc: "ข้อปฏิบัติตัวเมื่อผู้ป่วยมารับยาจากเภสัชกร",
                url: "https://www.youtube.com/embed/RT3FCFIQipg"
            },
            {
                desc: "รู้จักยา และอาการไม่พึงประสงค์",
                url: "https://www.youtube.com/embed/uRVnCHXI0ig"
            },
            {
                desc: "ใช้ยาอย่างไรให้ถูกวิธี และการเก็บรักษายา",
                url: "https://www.youtube.com/embed/lSev1owleLs"
            },
            {
                desc: "ปัญหาจากการใช้ยา",
                url: "https://www.youtube.com/embed/Nc1uDNiDC5U"
            },
            {
                desc: "การแพ้ยา และอาการแพ้ยา",
                url: "https://www.youtube.com/embed/l3UWnvaTxNc"
            },
            {
                desc: "โรคท้องเสียจำเป็นต้องกินยาปฏิชีวนะ หรือไม่?",
                url: "https://www.youtube.com/embed/LSbtg3JrTKM"
            },
            {
                desc: "การใช้ยาสำหรับแผลเลือดออก",
                url: "https://www.youtube.com/embed/kzyagJYHMwk"
            },
            {
                desc: "การใช้ยาปฏิชีวนะในโรคหวัด",
                url: "https://www.youtube.com/embed/QhbDSeKM5Z0"
            }
        ];

        vm.trustUrl = trustUrl;

        init();

        function trustUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function init() {

        }
    }

} ());