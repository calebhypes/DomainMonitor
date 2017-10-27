var express      = require('express'),
    router       = express.Router(),
    whois        = require('whois-json'),
    domain       = require('../models/domain');

// INDEX
router.get("/", function(req, res) {
    res.render("dashboard/index");
});

// CREATE
router.post("/", function(req, res) {
    // get data from form
    // add new domain to DB
});

// NEW
router.get("/new", function(req, res) {
    res.send("New domain form here!");
});

module.exports = router;