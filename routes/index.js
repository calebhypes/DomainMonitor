var express      = require('express'),
    router       = express.Router(),
    passport     = require('passport'),
    User         = require('../models/user');

// Root route
router.get("/", function(req, res) {
    res.send("This is the NEW index page");
});

// Authentication routes here





module.exports = router;