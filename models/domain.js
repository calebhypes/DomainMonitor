var mongoose = require('mongoose');

var domainSchema = new mongoose.Schema({
    domain: String,
    creationDate: String,
    lastUpdated: String,
    expiryDate: String,
    sslExists: String,
    nameServers: Array,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    settings: {
        reminder: String,
        remindOn: Date,
    }
});


module.exports = mongoose.model("Domain", domainSchema);
