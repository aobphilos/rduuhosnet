var passport = require('passport');

module.exports = {

    login: function (req, res) {

        passport.authenticate('local', function (err, user, info) {

            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }

            req.logIn(user, function (err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    isAuthen: function (req, res) {

        const isAuthenticated = req.isAuthenticated();

        const result = {
            isAuthen: isAuthenticated,
            isActivated: false,
            activateKey: ""
        };

        if (req.user) {
            result.isActivated = req.user.isActivated;
            result.activateKey = req.user.activateKey;
        }

        return res.json(result);
    },

    sendActivation: function (req, res) {

        if (req.isAuthenticated()) {

            MailService
                .sendActivation(
                    req.body.email,
                    req.user.organization,
                    req.user.username,
                    req.user.activateKey)
                .then(() => {
                    return res.json({
                        message: "ok"
                    });
                })
                .fail((error) => {
                    return res.json({
                        message: error.message
                    });
                });
        } else {

            return res.json({
                message: "user not authorized"
            });

        }
    },

    confirmActivation: function (req, res) {

        const user = {
            username: req.query.user,
            activateKey: req.query.key
        };

        if (user.username && user.activateKey) {

            UserService
                .confirmUser(user)
                .then((users) => {
                    req.logIn(users[0], function (err) {
                        if (err) return res.redirect("/home/#/member");
                        else return res.redirect("/home/#/member/confirm");
                    });
                })
                .fail((err) => {
                    return res.redirect("/home/#/member");
                });

        } else {

            return res.redirect("/home/#/member");
        }


    }
};