(function () {
  'use strict';

  angular
    .module('rdu.ui.knowledge')
    .controller('KnowledgePeopleCtrl', [
      '$rootScope',
      '$window',
      '_',
      KnowledgePeopleCtrl
    ])
    .controller('KnowledgeHealthCareCtrl', [
      '$rootScope',
      '$window',
      '$location',
      '_',
      KnowledgeHealthCareCtrl
    ])
    .controller('KnowledgeHealthcareLabelCtrl', [
      '$rootScope',
      '_',
      'DBFileApi',
      KnowledgeHealthcareLabelCtrl
    ]);

  function KnowledgePeopleCtrl($rootScope, $window, _) {
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
        $window.open(image[0]["image"], "knowledge_people");

    }

    function init() {
      vm.showImage('kid');
    }

  }

  function KnowledgeHealthCareCtrl($rootScope, $window, $location, _) {

    var vm = this;

    var LINK_TYPE = {
      NONE: 0,
      LINK: 1,
      PAGE: 2
    };

    vm.items = [
      {
        name: "MedWatch",
        image: "/images/knowledge/healthcare/h1.jpg",
        link: "http://www.fda.gov/Safety/MedWatch/",
        linkType: LINK_TYPE.LINK
      },
      {
        name: "Ethics",
        image: "/images/knowledge/healthcare/h2.jpg",
        link: "",
        linkType: LINK_TYPE.NONE
      },
      {
        name: "Labeling",
        image: "/images/knowledge/healthcare/h3.jpg",
        link: "/knowledge/healthcare/label",
        linkType: LINK_TYPE.PAGE
      },
      {
        name: "Update",
        image: "/images/knowledge/healthcare/h4.jpg",
        link: "",
        linkType: LINK_TYPE.NONE
      }
    ];

    vm.navigate = navigate;

    init();

    function navigate(item) {

      switch (item.linkType) {

        case LINK_TYPE.LINK:
          $window.open(item.link, "knowledge_healthcare");
          break;

        case LINK_TYPE.PAGE:
          $location.path(item.link);
          break;

        default: break;
      }

    }

    function init() {

    }

  }

  function KnowledgeHealthcareLabelCtrl($rootScope, _, DBFileApi) {

    var vm = this;

    vm.drugLabel = [];
    vm.currentLabel = {};

    vm.chooseLabel = chooseLabel;
    vm.labelKeypress = labelKeypress;

    init();

    function loadDrugLabel(params) {
      DBFileApi.getDrugLabel(null).$promise.then(function (data) {
        vm.drugLabel = data;
      });
    }

    function chooseLabel(name) {
      var item = _.find(vm.drugLabel, ['drug_name', name]);
      vm.currentLabel = item;
      console.log(item);
    }

    function findLabel(name) {
      var item = _.find(vm.drugLabel, function (dg) {
        return _.startsWith(dg.drug_name.toLowerCase(), name.toLowerCase());
      });

      vm.currentLabel = item;
      console.log(item);
    }

    function convertCR(text) {
      return text.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
    }

    function labelKeypress(e) {

      var text = angular.element(e.currentTarget).val();
      findLabel(text);

    }

    function init() {
      loadDrugLabel();
    }

  }

} ());

