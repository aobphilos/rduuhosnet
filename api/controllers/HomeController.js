/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var xlsx = require('xlsx');

module.exports = {

    index: function (req, res) {
        return res.view("home/index");
    },

    getDropboxFiles: function (req, res) {
        var list = DropboxService.listFiles()
            .then(function (result) {

                return res.json(result);
            });
    },

    getDrugLabel: function (req, res) {

        var list = DropboxService.getLabelFile()
            .then(function (path) {

                var workbook = xlsx.readFile(path);
                var sheetname = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetname];
                var result = xlsx.utils.make_json(worksheet);

                return res.json(result);

            });
    }
};