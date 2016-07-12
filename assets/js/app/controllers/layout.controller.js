(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('LayoutCtrl', [
            '$scope',
            '$mdSidenav',
            LayoutCtrl
        ]);

    function LayoutCtrl($scope, $mdSidenav) {

        var vm = this;

        vm.openLeftMenu = openLeftMenu;

        init();

        function openLeftMenu() {

            $mdSidenav('left').toggle();
        }

        function init() {}

    }

}());