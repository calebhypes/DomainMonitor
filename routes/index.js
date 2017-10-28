var express      = require('express'),
    router       = express.Router(),
    passport     = require('passport'),
    User         = require('../models/user');

// Root route
router.get("/", function(req, res) {
    res.render("landing");
});

// Authentication routes here





module.exports = router;