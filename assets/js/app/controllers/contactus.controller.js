(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('ContactUsCtrl', [
            '$rootScope',
            '$window',
            '$timeout',
            '_',
            ContactUsCtrl
        ]);

    function ContactUsCtrl($rootScope, $window, $timeout, _) {
        var vm = this;

        init();

        function init() {

        }

    }

}());