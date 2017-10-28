var mongoose = require('mongoose');

var domainSchema = new mongoose.Schema({
    domain: String,
    creationDate: String,
    lastUpdated: String,
    expiryDate: String,
});


module.exports = mongoose.model("Domain", domainSchema);
