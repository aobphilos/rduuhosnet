var _ = require('lodash');
var Q = require('q');
var Dropbox = require('dropbox');
var https = require('https');
var fs = require('fs');

module.exports = {

    listFiles: function () {

        var deferred = Q.defer();

        RduDropbox.getMeta()
            .then(RduDropbox.getAllLink)
            .then(deferred.resolve)
            .fail(error);

        function error(err) {
            console.log(err);
            deferred.reject(err);
        }

        return deferred.promise;

    },

    getLabelFile: function () {

        var deferred = Q.defer();

        RduDropbox.getLabelFile()
            .then(deferred.resolve)
            .fail(error);

        function error(err) {
            console.log(err);
            deferred.reject(err);
        }

        return deferred.promise;


    }

};

var RduDropbox = (function () {
    var _this = this;

    _this.context = {};
    _this.getContext = getContext;
    _this.getUrl = getUrl;
    _this.getStreamFromLink = getStreamFromLink;
    _this.checkLabelValid = checkLabelValid;

    var adapter = {
        getMeta: getMeta,
        getAllLink: getAllLink,
        getLabelFile: getLabelFile
    };

    function getContext() {

        if (_.isEmpty(_this.context)) {

            var dbx = new Dropbox({
                accessToken: sails.config.dropbox.access_token
            });

            _this.context = dbx;

        }

        return _this.context;
    }

    function getMeta() {

        var deferred = Q.defer();

        var dbx = _this.getContext();

        dbx.filesListFolder({
            path: sails.config.dropbox.target_path
        })
            .then(success)
            .catch(error);

        function filterForImage(file) {
            var ext = sails.config.dropbox.file_filter;
            return ((file[".tag"] == "file") && ext.test(file["name"]));
        }

        function mapModel(file) {
            return {
                name: file.name,
                path: file.path_lower
            };
        }

        function success(res) {

            var files = res.entries;

            if (files.length > 0) {

                var filtered = _.filter(files, filterForImage);
                var sorted = _.orderBy(filtered, ['server_modified'], ['desc']);
                var target = _.take(sorted, sails.config.dropbox.display_limit);
                var result = _.map(target, mapModel);

                deferred.resolve(result);

            } else {
                deferred.resolve([]);
            }

        }

        function error(err) {
            deferred.reject(err);
        }

        return deferred.promise;

    }

    function getAllLink(files) {
        var deferred = Q.defer();

        files.push({
            name: 'SeeMore',
            path: sails.config.dropbox.target_path
        });

        var jobs = _.map(files, _this.getUrl);

        Q.all(jobs)
            .then(success)
            .fail(error);

        function success(urls) {
            deferred.resolve(urls);
        }

        function error(err) {
            deferred.reject(err);
        }

        return deferred.promise;
    }

    function getUrl(file) {

        var deferred = Q.defer();

        var dbx = _this.getContext();

        dbx.sharingCreateSharedLink({
            path: file.path
        })
            .then(success)
            .catch(error);

        function success(res) {
            _.extend(file, {
                urlLink: res.url,
                urlShow: res.url.replace(/\?dl=0/ig, "?dl=1")
            });

            deferred.resolve(file);
        }

        function error(err) {
            deferred.reject(err);
        }

        return deferred.promise;
    }

    function checkLabelValid(path) {
        var deferred = Q.defer();

        fs.stat(path, (err, stat) => {
            if (err) {
                deferred.resolve(false);
            } else {

                var timeDiff = Math.abs(Date.now() - stat.mtime);
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                deferred.resolve((diffDays <= 1));
            }
        });

        return deferred.promise;
    }

    function getLabelFile() {

        var deferred = Q.defer();

        _this.checkLabelValid(sails.config.excel.label)
            .then((isValid) => {
                if (!isValid) {
                    var dbx = _this.getContext();

                    dbx.filesGetTemporaryLink({
                        path: sails.config.dropbox.data_path + "/label.xlsx"
                    })
                        .then(success)
                        .catch(error);
                } else {
                    deferred.resolve(sails.config.excel.label);
                }
            });

        function success(res) {
            _this.getStreamFromLink(res.link)
                .then(deferred.resolve)
                .fail(deferred.reject);
        }

        function error(err) {
            deferred.reject(err);
        }

        return deferred.promise;
    }

    function getStreamFromLink(link) {

        var deferred = Q.defer();
        var path = sails.config.excel.label;
        var file = fs.createWriteStream(path);

        https.get(link, success).on('error', error);

        function success(res) {
            res.on('data', (d) => {
                file.write(d);
            });

            res.on('end', () => {
                file.end(() => {
                    deferred.resolve(path);
                });
            });

        }

        function error(err) {
            deferred.reject(err);
        }

        return deferred.promise;

    }

    return adapter;

})();