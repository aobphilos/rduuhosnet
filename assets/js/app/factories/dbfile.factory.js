(function () {
    'use strict';

    angular
        .module('rdu.ui')
        .factory('DBFileApi', ['$resource', adapter])

    function adapter($resource) {
        return $resource('/api/db/files', null, {
            "get": {
                method: 'GET',
                isArray: true
            },
            "getDrugLabel": {
                url: '/api/db/drug-label',
                method: 'GET',
                isArray: true
            }
        });
    }


} ());