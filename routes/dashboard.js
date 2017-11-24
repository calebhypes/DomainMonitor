var express      = require('express'),
    router       = express.Router(),
    whois        = require('whois-json'),
    moment       = require('moment'),
    Domain       = require('../models/domain'),
    User         = require('../models/user'),
    middleware   = require('../middleware');

// INDEX
router.get("/", middleware.isLoggedIn, function(req, res) {
    // Domain.find({}, function(err, allDomains) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render("dashboard/index", {domains: allDomains, page: 'dashboard'});
    //     }
    // });
    User.findById(req.user._id).populate("domains").exec(function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            res.render("dashboard/index", {user: foundUser, page: "dashboard" });
        }
    });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form
    var domain = req.body.domain;

    // whois lookup
    whois(domain, function(err, result) {
        if (err) {
            console.log("An error occurred: " + err);
            return res.redirect("/dashboard");
        }
        // raw whois data
        var dataString = JSON.stringify(result, null, 2);
        var data = JSON.parse(dataString);
        var creationDate = data.creationDate;
        var lastUpdated = data.updatedDate;
        var expiryDate = data.registryExpiryDate;

        // momentjs conversion
        var utcCreate = moment.utc(creationDate, moment.ISO_8601);
        var localCreate = utcCreate.local().format('MMMM DD, YYYY hh:mm A');
        var utcUpdated = moment.utc(lastUpdated, moment.ISO_8601);
        var localUpdate = utcUpdated.local().format('MMMM DD, YYYY hh:mm A');
        var utcExpiry = moment.utc(expiryDate, moment.ISO_8601);
        var localExpiry = utcExpiry.local().format('MMMM DD, YYYY hh:mm A');

        // domain user association
        var owner = {
            id: req.user._id,
            username: req.user.username
        };
        // var nameServers = JSON.stringify(data.nameServers).split(" ");
        var sslExists = "Yes";
        // New domain creation
        var newDomain = {domain: domain, creationDate: localCreate, lastUpdated: localUpdate, expiryDate: localExpiry, owner: owner, sslExists: sslExists};
        // console.log(newDomain);

        // add domain to DB under User model.
        User.findById(req.user._id, function(err, user) {
            Domain.create(newDomain, function(err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {
                    user.domains.push(newlyCreated);
                    user.save();
                    req.flash("success", "Successfully created new domain listing!")
                    console.log("Added new domain to database!");
                    res.redirect("/dashboard");
                };
            });
        });
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("dashboard/new");
});

// EDIT
router.get("/:id/edit", middleware.checkDomainOwnership, function(req, res) {
    Domain.findById(req.params.id, function(err, foundDomain) {
        res.render("dashboard/edit", {domain: foundDomain})
    });
});

// DESTROY
router.delete("/:id", middleware.checkDomainOwnership, function(req, res) {
    Domain.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/dashboard");
        } else {
            req.flash("success", "Domain listing removed!");
            res.redirect("/dashboard");
        };
    });
});

module.exports = router;