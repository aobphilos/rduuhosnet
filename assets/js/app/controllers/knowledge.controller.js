(function () {
  'use strict';

  angular
    .module('rdu.ui.knowledge')
    .controller('PeopleCtrl', [
      '$rootScope',
      '$window',
      '_',
      PeopleCtrl
    ])
    .controller('HealthCareCtrl', [
      '$rootScope',
      '$window',
      '_',
      HealthCareCtrl
    ]);

  function PeopleCtrl($rootScope, $window, _) {
    var vm = this;

    vm.images = [
      {
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
      }
    ];

    vm.showImage = showImage;
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
      var image = _.filter(vm.images, function (s) {
        return s.name === name;
      });

      if (image.length > 0)
        $window.open(image[0]["image"], "_blank");
    }

    function init() {

      vm.showImage("kid");

    }

  }

  function HealthCareCtrl($rootScope, $window, _) {
    var vm = this;

    init();

    function init() {



    }
  }

} ());