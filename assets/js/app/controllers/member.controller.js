(function () {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('MemberCtrl', [
            '$rootScope',
            '$window',
            '$timeout',
            '_',
            'AuthApi',
            '$mdDialog',
            MemberCtrl
        ]);

    function MemberCtrl($rootScope, $window, $timeout, _, AuthApi, $mdDialog) {
        var vm = this;

        vm.isAuthenticated = false;
        vm.username = "";
        vm.password = "";

        vm.login = login;
        vm.inputKeyDown = inputKeyDown;
        vm.showAlert = showAlert;

        init();

        function inputKeyDown(e, isValid) {
            if (e.keyCode === 13) {
                vm.login(isValid);
            }
        }

        function checkAuthen() {
            AuthApi.isAuthen(null).$promise
                .then(function (result) {
                    vm.isAuthenticated = result.isAuthen;
                });
        }

        function login(isValid) {
            
            if (isValid) {
                AuthApi.login({ username: vm.username, password: vm.password }).$promise
                    .then(function (result) {
                        if (result.user) {
                            vm.isAuthenticated = true;
                        } else {
                            vm.isAuthenticated = false;
                            vm.showAlert(result.message);

                        }
                    });
            }
        }

        function showAlert(msg) {
            alert = $mdDialog.alert()
                .title('Login Failed')
                .textContent(msg)
                .ok('Close');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        }

        function init() {
            checkAuthen();
        }

    }

} ());