(function () {
  'use strict';

  angular
    .module('rdu.ui.member', [])
    .config(['$routeProvider', UIConfig])

  function UIConfig($routeProvider) {

    // Route
    $routeProvider
      .when('/member', {
        controller: 'MemberCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/member/index.html',
        caseInsensitiveMatch: true
      })
      .when('/member/download', {
        controller: 'MemberDownloadCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/member/download.html',
        caseInsensitiveMatch: true
      })
      .when('/member/activate', {
        controller: 'MemberActivateCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/member/activate.html',
        caseInsensitiveMatch: true
      })
      .otherwise({
        redirectTo: '/'
      });

  }

} ());