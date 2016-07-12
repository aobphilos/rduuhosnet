(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .factory('_', ['$window', LodashFactory])

    function LodashFactory($window) {
        // place lodash include before angular
        return $window._;
    }

}());