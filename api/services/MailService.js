var _ = require('lodash');
var Q = require('q');
var fs = require('fs');

var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

module.exports = {

  sendActivation: function (mail_to, mail_name, username, activateKey) {

    var deferred = Q.defer();

    var config = sails.config.email;

    fs.readFile(config.template, 'utf8',
      (err, html) => {

        if (err) {
          console.log('mail error: ', err);
          deferred.reject(err);
        }

        var bodyTemplate = _.template(html);
        var bodyData = {
          url: `${config.confirmPath}?user=${username}&key=${activateKey}`,
          icon: config.icon,
          homePage: config.homePage
        };

        var body = bodyTemplate(bodyData);

        var from_email = new helper.Email(config.from, config.fromName);
        var to_email = new helper.Email(mail_to,
          mail_name ? mail_name : "Guest");
        var subject = config.subject;
        var content = new helper.Content('text/html', body);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        sg.API(request, function (error, response) {
          if (error) deferred.reject(error);
          else deferred.resolve(response.statusCode)
        });

      });

    return deferred.promise;
  }

}