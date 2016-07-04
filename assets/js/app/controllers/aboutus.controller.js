(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('AboutUsCtrl', [
            '$rootScope',
            '$timeout',
            AboutUsCtrl
        ]);

    function AboutUsCtrl($rootScope, $timeout) {
        var vm = this;

        init();

        function init() {


        }

    }

}());