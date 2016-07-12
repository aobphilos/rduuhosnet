(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .factory('StateApi', ['$resource', adapter])

    function adapter($resource) {
        return $resource('/data/sponsors.json', null, {
            "getSponsors": {
                method: 'GET',
                url: '/data/sponsors.json',
                isArray: true
            },
            "getSupports": {
                method: 'GET',
                url: '/data/supports.json',
                isArray: true
            }
        });
    }

}());