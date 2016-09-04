(function () {
  'use strict';

  angular
    .module('rdu.ui.knowledge', [])
    .config(['$routeProvider', UIConfig]);

  function UIConfig($routeProvider) {

    // Route
    $routeProvider
      .when('/knowledge/people', {
        controller: 'KnowledgePeopleCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/knowledge/people/index.html',
        caseInsensitiveMatch: true
      })
      .when('/knowledge/healthcare', {
        controller: 'KnowledgeHealthCareCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/knowledge/healthcare/index.html',
        caseInsensitiveMatch: true
      })
      .when('/knowledge/healthcare/label', {
        controller: 'KnowledgeHealthcareLabelCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/knowledge/healthcare/label.html',
        caseInsensitiveMatch: true
      })
      .when('/knowledge/healthcare/ethic', {
        controller: 'KnowledgeHealthcareEthicCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/js/app/templates/knowledge/healthcare/ethic.html',
        caseInsensitiveMatch: true
      })
      .otherwise({
        redirectTo: '/'
      });

  }

} ());




