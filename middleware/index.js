var Domain      = require('../models/domain'),
    User        = require('../models/user');

var middlewareObj = {};

middlewareObj.checkDomainOwnership = function(req, res, next) {
    if (req.isAuthenticated) {
        Domain.findById(req.params.id, function(err, foundDomain) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundDomain.owner.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                };
            };
        });
    } else {
        res.redirect("back");
    };
};

middlewareOb.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    };
    res.redirect("/login");
};

module.exports = middlewareObj;