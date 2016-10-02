(function () {
    'use strict';

    angular
        .module('rdu.ui')
        .factory('AuthApi', ['$resource', adapter])

    function adapter($resource) {
        return $resource('/api/login', null, {
            "login": {
                method: 'POST',
                url: '/api/login'
            },
            "logout": {
                method: 'GET',
                url: '/api/logout'
            },
            "isAuthen": {
                method: 'GET',
                url: '/api/isauthen'
            },
            "sendActivation": {
                method: 'POST',
                url: '/api/sendactivation'
            }
        });
    }

}());