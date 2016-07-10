(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('AboutUsCtrl', [
            '$rootScope',
            '$timeout',
            '_',
            AboutUsCtrl
        ]);

    function AboutUsCtrl($rootScope, $timeout, _) {
        var vm = this;
        vm.showSection = showSection;

        init();

        function showSection(name) {
            var sections = _.filter(vm.sections, function(s) {
                return s.name === name;
            });

            if (sections.length > 0)
                vm.template = sections[0]["url"];
        }

        function init() {

            vm.sections = [{
                name: "faq",
                url: "/js/app/templates/aboutus/faq.html"
            }, {
                name: "keys",
                url: "/js/app/templates/aboutus/keys.html"
            }, {
                name: "manual",
                url: "/js/app/templates/aboutus/manual.html"
            }, {
                name: "project",
                url: "/js/app/templates/aboutus/project.html"
            }, ];

            vm.showSection("project");

        }

    }

}());