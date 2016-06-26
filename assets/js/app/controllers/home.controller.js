(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('HomeCtrl', [
            '$rootScope',
            HomeCtrl
        ]);

    function HomeCtrl($rootScope) {
        var vm = this;

        init();

        function init() {}

    }

}());