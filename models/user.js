var mongoose                    = require('mongoose'),
    passportLocalMongoose       = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    domains: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Domain"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);