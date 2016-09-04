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
    ])
    .controller('KnowledgeHealthcareEthicCtrl', [
      '$rootScope',
      '_',
      KnowledgeHealthcareEthicCtrl
    ])
    .controller('KnowledgeHealthcareUpdateCtrl', [
      '$rootScope',
      '$window',
      '_',
      KnowledgeHealthcareUpdateCtrl
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
        link: "/knowledge/healthcare/ethic",
        linkType: LINK_TYPE.PAGE
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
        link: "/knowledge/healthcare/update",
        linkType: LINK_TYPE.PAGE
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
        vm.drugLabel = _.orderBy(data, ['drug_name'], ['asc']);
      });
    }

    function chooseLabel(name) {
      var item = _.find(vm.drugLabel, ['drug_name', name]);
      vm.currentLabel = item;
    }

    function findLabel(name) {
      var item = _.find(vm.drugLabel, function (dg) {
        return _.startsWith(dg.drug_name.toLowerCase(), name.toLowerCase());
      });

      vm.currentLabel = item;
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

  function KnowledgeHealthcareEthicCtrl($rootScope, _) {
    var vm = this;

    init();

    function init() {

    }
  }

  function KnowledgeHealthcareUpdateCtrl($rootScope, $window, _) {
    var vm = this;

    vm.images = [
      {
        name: "HC1",
        image: "/images/knowledge/healthcare/update/HC1.JPG",
        desc: "การบริหารยา Exjade  ให้ถูกวิธี"
      },
      {
        name: "HC2",
        image: "/images/knowledge/healthcare/update/HC2.JPG",
        desc: "การใช้ยาปฏิชีวนะอย่างรับผิดชอบใน Acute Diarrhea"
      },
      {
        name: "HC3",
        image: "/images/knowledge/healthcare/update/HC3.JPG",
        desc: "ยาฉีด Sandostatin กับ Sandostatin LAR ไม่เหมือนกัน"
      },
      {
        name: "HC4",
        image: "/images/knowledge/healthcare/update/HC4.JPG",
        desc: "ยา Augmentin® SR tab แบ่งครึ่งเม็ดได้หรือไม่"
      },
      {
        name: "HC5",
        image: "/images/knowledge/healthcare/update/HC5.JPG",
        desc: "คำแนะนำสำหรับการใช้ metformin ในผู้ป่วยที่การทำงานของไตบกพร่อง"
      },
      {
        name: "HC6",
        image: "/images/knowledge/healthcare/update/HC6.JPG",
        desc: "การผสมและบริหารยาฉีด Sodium Bicarbonate"
      },
      {
        name: "HC7",
        image: "/images/knowledge/healthcare/update/HC7.JPG",
        desc: "ยากลุ่ม fluoroquinolones"
      },
      {
        name: "HC8",
        image: "/images/knowledge/healthcare/update/HC8.JPG",
        desc: "การบริหารยา calcitonin inj ในภาวะแคลเซียมในเลือดสูง"
      },
      {
        name: "HC9",
        image: "/images/knowledge/healthcare/update/HC9.JPG",
        desc: "RDU ของการใช้ยาปฏิชีวนะอย่างรับผิดชอบใน RI"
      },
      {
        name: "HC10",
        image: "/images/knowledge/healthcare/update/HC10.JPG",
        desc: "ทำไมจึงมีการจ่าย folic acid ในสตรีที่ได้รับ co-trimoxazole"
      },
      {
        name: "HC11",
        image: "/images/knowledge/healthcare/update/HC11.JPG",
        desc: "เหตุใด Paracetamol Inj จึงควรถูกคัดออกจากบัญชียาโรงพยาบาล"
      },
      {
        name: "HC12",
        image: "/images/knowledge/healthcare/update/HC12.JPG",
        desc: "การบริหารยา Leuco-Plus® (Filgrastim Inj 300 mcg/mL)"
      },
      {
        name: "HC13",
        image: "/images/knowledge/healthcare/update/HC13.JPG",
        desc: "RDU ของการใช้ยารักษาโรคหืด (asthma)"
      },
      {
        name: "HC14",
        image: "/images/knowledge/healthcare/update/HC14.JPG",
        desc: "การใช้ Antihistamines ในสตรีมีครรภ์"
      },
      {
        name: "HC15",
        image: "/images/knowledge/healthcare/update/HC15.JPG",
        desc: "50% MgSO  inj  2 mL  =  ? กรัม"
      },
      {
        name: "HC16",
        image: "/images/knowledge/healthcare/update/HC16.JPG",
        desc: "RDU ของการใช้ยาในโรคไตเรื้อรัง"
      },
      {
        name: "HC17",
        image: "/images/knowledge/healthcare/update/HC17.JPG",
        desc: "Pariet® Tab. (Rabeprazole Sodium) ห้ามให้ทาง Nasogastric tube"
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
        $window.open(image[0]["image"], "knowledge_healthcare_update");

    }

    function init() {
      vm.showImage('HC1');
    }

  }

} ());

