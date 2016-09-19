var _ = require('lodash');
var Q = require('q');
var fs = require('fs');

var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

module.exports = {

  sendActivation: function (mail_to, activateUrl) {

    var config = sails.config.email;

    fs.readFile(config.template, 'utf8',
      (err, html) => {

        if (err) {
          console.log('mail error: ', err);
          return;
        }

        var bodyTemplate = _.template(html);
        var bodyData = {
          url: activateUrl,
          icon: config.icon,
          homePage: config.homePage
        };

        var body = bodyTemplate(bodyData);

        var from_email = new helper.Email(config.from, config.fromName);
        var to_email = new helper.Email(mail_to);
        var subject = config.subject;
        var content = new helper.Content('text/html', body);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        sg.API(request, function (error, response) {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
        });

      });
  }
}


