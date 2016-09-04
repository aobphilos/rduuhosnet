(function () {
    'use strict';

    angular
        .module('rdu.ui')
        .controller('MemberCtrl', [
            '$rootScope',
            '$window',
            '$timeout',
            '_',
            'AuthApi',
            '$mdDialog',
            MemberCtrl
        ]);

    function MemberCtrl($rootScope, $window, $timeout, _, AuthApi, $mdDialog) {
        var vm = this;

        vm.isAuthenticated = false;
        vm.username = "";
        vm.password = "";

        vm.login = login;
        vm.inputKeyDown = inputKeyDown;
        vm.showAlert = showAlert;

        vm.documents = [
            {
                name: "เกณฑ์จริยธรรมจากอย.7 มค 59",
                url: "https://drive.google.com/file/d/0By5NmZH6ZuiDdnV0dHM3MjNYSmM/view"
            },
            {
                name: "แนวทางปฏิบัติตามเกณฑ์จริยธรรมว่าด้วย การจัดซื้อจัดหาและการส่งเสริมการขายยาและเวชภัณฑ์ ของโรงพยาบาลในเครือข่าย UHOSNET",
                url: "https://drive.google.com/file/d/0By5NmZH6ZuiDU0N1dVZkLVUxWVE/view"
            },
            {
                name: "(ตัวอย่าง)ประกาศเกณฑ์จริยธรรมส่งเสริมการขายยา",
                url: "https://drive.google.com/file/d/0By5NmZH6ZuiDZ3Y2MzJOMTVxTGc/view"
            },
            {
                name: "UHOSNET Pharmacy and Therapeutics Committees Checklist",
                url: "https://drive.google.com/file/d/0By5NmZH6ZuiDUWJHZVJLUHB5QlE/view"
            },
            {
                name: "ผลการทำแบบสอบถามเกี่ยวกับฉลากยา (Label RDU UHOSNET)",
                url: "https://drive.google.com/open?id=0B2sfYBZUThrEUl85Xy1JZUZPZjQ"
            }];

        vm.reports = [
            {
                name: "รายงานการประชุม RDU  UHOSNET ครั้งที่ 5_2559 วันที่ 29 มิ.ย. 59",
                url: "https://drive.google.com/open?id=0B2sfYBZUThrEenRrN3Z6MFpvS2c"
            },
            {
                name: "รายงานการประชุม RDU UHOSNET ครั้งที่ 4_2559 วันที่ 24 พค.59",
                url: "https://drive.google.com/open?id=0B2sfYBZUThrEbjh6ZWRDV0FBV2c"
            },
            {
                name: "รายงานการประชุม RDU UHOSNET ครั้งที่ 3_2559 วันที่ 7 เม.ย.59",
                url: "https://drive.google.com/open?id=0B2sfYBZUThrEdDVpdC1ObDVfZ1k"
            },
            {
                name: "รายงานการประชุม RDU UHOSNET ครั้งที่ 2_2559 วันที่ 29 ก.พ. 59",
                url: "https://drive.google.com/open?id=0B2sfYBZUThrEX0VMUEpKMEFwUmM"
            },
            {
                name: "รายงานการประชุม RDU UHOSNET ครั้งที่ 1_2559  วันที่ 1  ก.พ. 59",
                url: "https://drive.google.com/open?id=0B2sfYBZUThrEQ1lUcW1HeVJzUVE"
            },
            {
                name: "รายงานการประชุม  RDU UHOSNET ครั้งที่ 4_2558 วันที่ 21 ธ.ค.58",
                url: "https://drive.google.com/open?id=0B2sfYBZUThrEaHFOb3M0NXh6ams"
            },
            {
                name: "รายงานการประชุม RDU UHOSNET ครั้งที่ 3_2558 วันที่ 14 ต.ค.58",
                url: "https://drive.google.com/open?id=0B2sfYBZUThrEMVUxTUN2WlZyQTA"
            }
        ];

        init();

        function inputKeyDown(e, isValid) {
            if (e.keyCode === 13) {
                vm.login(isValid);
            }
        }

        function checkAuthen() {
            AuthApi.isAuthen(null).$promise
                .then(function (result) {
                    vm.isAuthenticated = result.isAuthen;
                });
        }

        function login(isValid) {

            if (isValid) {
                AuthApi.login({ username: vm.username, password: vm.password }).$promise
                    .then(function (result) {
                        if (result.user) {
                            vm.isAuthenticated = true;
                        } else {
                            vm.isAuthenticated = false;
                            vm.showAlert(result.message);

                        }
                    });
            }
        }

        function showAlert(msg) {
            alert = $mdDialog.alert()
                .title('Login Failed')
                .textContent(msg)
                .ok('Close');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        }

        function init() {
            checkAuthen();
        }

    }

} ());