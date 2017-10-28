var express      = require('express'),
    router       = express.Router(),
    whois        = require('whois-json'),
    Domain       = require('../models/domain');

// INDEX
router.get("/", function(req, res) {
    res.render("dashboard/index");
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
    });
    // add new domain to DB
});

// NEW
router.get("/new", function(req, res) {
    res.send("New domain form here!");
});

module.exports = router;