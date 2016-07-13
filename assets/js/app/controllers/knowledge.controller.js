(function () {
  'use strict';

  angular
    .module('rdu.ui')
    .controller('KnowledgePeopleCtrl', [
      '$rootScope',
      '$window',
      '$timeout',
      '_',
      KnowledgePeopleCtrl
    ]);

  function KnowledgePeopleCtrl($rootScope, $window, $timeout, _) {
    var vm = this;

    vm.images = [{
      name: "geriatric",
      image: "/images/knowledge/people/geriatric.jpg"
    },
      {
        name: "kid",
        image: "/images/knowledge/people/kid.jpg"
      },
      {
        name: "lactation",
        image: "/images/knowledge/people/lactation.jpg"
      },
      {
        name: "liver",
        image: "/images/knowledge/people/liver.jpg"
      },
      {
        name: "preg",
        image: "/images/knowledge/people/preg.jpg"
      },
      {
        name: "renal",
        image: "/images/knowledge/people/renal.jpg"
      }];

    vm.showSection = showSection;
    vm.navigate = navigate;

    init();

    function showImage(name) {
      var image = _.filter(vm.images, function (s) {
        return s.name === name;
      });

      if (image.length > 0)
        vm.image = image[0]["image"];
    }

    function navigate(name) {
    }

    function init() {


      vm.showImage("kid");

    }

  }

} ());