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
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to Domain Monitor, " + user.username);
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

//logout logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
    console.log("Logged out!");
});

module.exports = router;