var express      = require('express'),
    router       = express.Router(),
    whois        = require('whois-json'),
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

    whois(domain, function(err, result) {
        if (err) {
            console.log("An error occurred: " + err);
            return res.redirect("/dashboard");
        }
        var dataString = JSON.stringify(result, null, 2);
        var data = JSON.parse(dataString);
        var creationDate = data.creationDate;
        var lastUpdated = data.updatedDate;
        var expiryDate = data.registryExpiryDate;
        var owner = {
            id: req.user._id,
            username: req.user.username
        };
        // var nameServers = JSON.stringify(data.nameServers).split(" ");
        var sslExists = "Yes";
        var newDomain = {domain: domain, creationDate: creationDate, lastUpdated: lastUpdated, expiryDate: expiryDate, owner: owner, sslExists: sslExists};
        // console.log(newDomain);
        User.findById(req.user._id, function(err, user) {
            Domain.create(newDomain, function(err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {
                    user.domains.push(newlyCreated);
                    user.save();
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
            console.log("Error, cannot delete: " + err);
        } else {
            res.redirect("/dashboard");
        };
    });
});

module.exports = router;