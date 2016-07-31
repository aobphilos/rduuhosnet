(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('MemberCtrl', [
            '$rootScope',
            '$window',
            '$timeout',
            '_',
            MemberCtrl
        ]);

    function MemberCtrl($rootScope, $window, $timeout, _) {
        var vm = this;

        init();
       
        function init() {

        }

    }

}());