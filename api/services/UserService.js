var _ = require('lodash');
var Q = require('q');
var fs = require('fs');

module.exports = {

  findUser: function (u) {

    var deferred = Q.defer();

    // find user data
    User.findOne({
        username: u.username,
        password: u.password
      })
      .exec(function (err, data) {

        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(data);
        }

      });


    return deferred.promise;
  },

  findOrCreateUser: function (u) {

    var deferred = Q.defer();

    // find user data
    User.findOne({
        username: u.username,
        password: u.password
      })
      .exec(function (err, data) {

        if (err) {
          deferred.reject(err);
        } else {
          if (data) {
            deferred.resolve(data);
          } else {
            UserService.createUser(u)
              .then(function (user) {
                deferred.resolve(user);
              })
              .fail(function (userError) {
                deferred.reject(userError);
              });
          }
        }

      });


    return deferred.promise;
  },

  createUser: function (u) {

    var deferred = Q.defer();

    // create user data
    User.create(u)
      .exec(function (err, data) {

        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(data);
        }

      });

    return deferred.promise;
  },

  loadDefaultData: function () {

    var deferred = Q.defer();

    fs.readFile(sails.config.models.initDataPath, 'utf8',
      (err, data) => {

        if (err) {
          deferred.reject(err);
        } else {
          var userList = JSON.parse(data);
          var qInsert = _.map(userList, UserService.findOrCreateUser);
          Q.all(qInsert).then(() => deferred.resolve(userList));
        }

      });

    return deferred.promise;

  },

  confirmUser: function (u) {

    var deferred = Q.defer();

    var criteria = {
      username: u.username,
      activateKey: u.activateKey
    };

    // find user data
    User.findOne(criteria)
      .exec(function (err, user) {

        if (err) {
          deferred.reject(err);
        } else {

          if (user) {
            var data = {
              isActivated: true,
              activateKey: ""
            };

            User.update(criteria, data)
              .exec(function (errUpdate, updated) {
                if (errUpdate) {
                  deferred.reject(errUpdate);
                } else {
                  deferred.resolve(updated);
                }
              });

          } else {
            deferred.reject(new Error("Can not find an user."));
          }

        }

      });

    return deferred.promise;
  }

};