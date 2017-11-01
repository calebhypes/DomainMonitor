var Domain      = require('../models/domain'),
    User        = require('../models/user');

var middlewareObj = {};

middlewareObj.checkDomainOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Domain.findById(req.params.id, function(err, foundDomain) {
            if (err) {
                req.flash("error", "Sorry, we couldn't find that domain!");
                console.log("error: domain not found!");
                res.redirect("/dashboard");
            } else {
                if (foundDomain.owner.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    console.log("Uh oh! You don't have permission to do that!");
                    res.redirect("/dashboard");
                };
            };
        });
    } else {
        req.flash("error", "You must be logged in to do this!");
        console.log("You must be logged in to do this!");
        res.redirect("/login");
    };
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    };
    req.flash("error", "You must be logged in to do this!");
    console.log("You must be logged in to do this!")
    res.redirect("/login");
};

module.exports = middlewareObj;