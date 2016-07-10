(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('LayoutCtrl', [
            '$scope',
            '$mdSidenav',
            '$location',
            LayoutCtrl
        ]);

    function LayoutCtrl($scope, $mdSidenav, $location) {

        var vm = this;

        vm.openLeftMenu = openLeftMenu;
        vm.navigate = navigate;

        init();

        function openLeftMenu() {

            $mdSidenav('left').toggle();
        }

        function navigate(url) {
            $location.url(url);
            $mdSidenav('left').close();
        }

        function init() {}

    }

}());