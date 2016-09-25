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

        }

        return res.json({
            message: "ok"
        });
    },

    confirmActivation: function (req, res) {

        return res.redirect("home/#/member");

    }
};