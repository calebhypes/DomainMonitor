var express      = require('express'),
    router       = express.Router(),
    whois        = require('whois-json'),
    Domain       = require('../models/domain');

// INDEX
router.get("/", function(req, res) {
    Domain.find({}, function(err, allDomains) {
        if (err) {
            console.log(err);
        } else {
            res.render("dashboard/index", {domains: allDomains, page: 'dashboard'});
        }
    });
});

// CREATE
router.post("/", function(req, res) {
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
        var newDomain = {domain: domain, creationDate: creationDate, lastUpdated: lastUpdated, expiryDate: expiryDate};
        console.log(newDomain);

        Domain.create(newDomain, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added new domain to database!");
                res.redirect("/dashboard");
            };
        });
    });
    // add new domain to DB
});

// NEW
router.get("/new", function(req, res) {
    res.render("dashboard/new");
});

router.get("/:id/edit", function(req, res) {
    Domain.findById(req.params.id, function(err, foundDomain) {
        res.render("dashboard/edit", {domain: foundDomain})
    });
});

module.exports = router;