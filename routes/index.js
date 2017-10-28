var express      = require('express'),
    router       = express.Router(),
    passport     = require('passport'),
    User         = require('../models/user');

// Root route
router.get("/", function(req, res) {
    res.render("landing");
});

// Authentication routes here

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// sign up logic
router.post("/register", function (req, res) {
    var newUser =  new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log("Error occurred while creating account!");
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function() {
            console.log("Account created successfully!");
            res.redirect("/dashboard");
        });
    });
});

// login form
router.get("/login", function(req, res) {
    res.render("login");
});

// login authentication
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    }), function(req, res) {
});

module.exports = router;