/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function(req, res) {
        return res.view("home/index");
    },

    getDropboxFiles: function(req, res) {
        var list = DropboxService.listFiles()
            .then(function(result) {

                return res.json(result);
            });
    }
};