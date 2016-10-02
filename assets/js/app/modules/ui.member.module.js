(function () {
  'use strict';

  angular
    .module('rdu.ui.member', [])
    .config(['$routeProvider', UIConfig])

  function UIConfig($routeProvider) {

    // Route
    $routeProvider
      .when('/member/download', {
        controller: 'MemberDownloadCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/member/download.html',
        caseInsensitiveMatch: true
      })
      .when('/member/confirm', {
        controller: 'MemberConfirmCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/member/confirm.html',
        caseInsensitiveMatch: true
      })
      .when('/member/activate', {
        controller: 'MemberActivateCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/member/activate.html',
        caseInsensitiveMatch: true
      })
      .when('/member', {
        controller: 'MemberCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/member/index.html',
        caseInsensitiveMatch: true
      })
      .otherwise({
        redirectTo: '/'
      });

  }

}());