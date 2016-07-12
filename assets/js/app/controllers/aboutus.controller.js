(function() {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('AboutUsCtrl', [
            '$rootScope',
            '$window',
            '$timeout',
            '_',
            AboutUsCtrl
        ]);

    function AboutUsCtrl($rootScope, $window, $timeout, _) {
        var vm = this;

        vm.sections = [{
            name: "faq",
            url: "/js/app/templates/aboutus/faq.html"
        }, {
            name: "keys",
            url: "/js/app/templates/aboutus/keys.html"
        }, {
            name: "manual",
            url: "http://drug.fda.moph.go.th/zone_admin/files/RDU%20final_220615.pdf"
        }, {
            name: "project",
            url: "/js/app/templates/aboutus/project.html"
        }, ];

        vm.questions = [{
            question: "Q1. การใช้ยาอย่างสมเหตุผล คืออะไร",
            answer: "การใช้ยาโดยมีข้อบ่งชี้ เป็นยาที่มีคุณภาพมีประสิทธิผลจริง ให้ประโยชน์เหนือกว่าความเสี่ยงอย่างชัดเจน มีราคาเหมาะสม โดยใช้ยาในขนาดที่พอเหมาะ ด้วยวิธีการให้ยาและความถี่ที่ถูกต้อง ด้วยระยะเวลารักษาที่เหมาะสม ผู้ป่วยให้การยอมรับและใช้ยาได้อย่างถูกต้องและต่อเนื่อง"
        }, {
            question: "Q2. โครงการนี้จัดทำขึ้นเพื่อวัตถุประสงค์ใด",
            answer: "เพื่อแก้ปัญหาการใช้ยาอย่างไม่สมเหตุผล และการแก้ไขปัญหาอย่างเป็นระบบ"
        }, {
            question: "Q3. ใครจะได้ประโยชน์จากโครงการนี้",
            answer: "ประชาชน หรือผู้รับบริการทางการแพทย์ และโรงพยาบาลที่เข้าร่วมโครงการ รวมถึงบุคลากรทางการแพทย์ ทั้งแพทย์ พยาบาล และเภสัชกร"
        }, {
            question: "Q4. วิธีง่ายๆ ในการใช้ยาอย่างสมเหตุผล",
            answer: "ใช้ยาตามคำแนะนำของแพทย์ ใช้ยาอย่างต่อเนื่อง ไม่หยุดยาหรือปรับขนาดยาเอง ไม่ควรซื้อยา อาหารเสริมหรือสมุนไพรมารับประทานเอง หากมีข้อสงสัยเกี่ยวข้องกับยา การใช้ยา หรือผลข้างเคียงจากยา ควรปรึกษาแพทย์หรือเภสัชกร"
        }, {
            question: "Q5. ถ้าต้องการหาความรู้เพิ่มเติมเกี่ยวกับ การใช้ยาอย่างสมเหตุผล สามารถทำได้อย่างไร",
            answer: "สามารถสืบค้นข้อมูลเบื้องต้นได้จากภายในเว็บไซต์นี้ หรือสอบถามได้ทาง คณะทำงานโรงพยาบาลส่งเสริมการใช้ยาอย่างสมเหตุผล"
        }]

        vm.showSection = showSection;
        vm.navigate = navigate;

        init();

        function showSection(name) {
            var sections = _.filter(vm.sections, function(s) {
                return s.name === name;
            });

            if (sections.length > 0)
                vm.template = sections[0]["url"];
        }

        function navigate(name) {
            var sections = _.filter(vm.sections, function(s) {
                return s.name === name;
            });

            if (sections.length > 0)
                $window.open(sections[0]["url"], "_blank");
            // $window.location.href = sections[0]["url"];
        }

        function init() {


            vm.showSection("project");

        }

    }

}());