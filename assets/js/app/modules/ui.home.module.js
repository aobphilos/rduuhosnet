(function () {
  'use strict';

  angular
    .module('rdu.ui.home', [])
    .config(['$routeProvider', UIConfig])

  function UIConfig($routeProvider) {

    // Route
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/home/index.html',
        caseInsensitiveMatch: true
      })
      .when('/home/download', {
        controller: 'HomeDownloadCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/home/download.html',
        caseInsensitiveMatch: true
      })
      .when('/home/media', {
        controller: 'HomeMediaCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/home/media.html',
        caseInsensitiveMatch: true
      })
      .otherwise({
        redirectTo: '/'
      });

  }

} ());