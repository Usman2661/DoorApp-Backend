var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
 
// Define your schema as normal.
var siteSchema = mongoose.Schema({
    SiteName: { type: String, required: true },
    SiteAddressLine1: { type: String, required: true },
    SiteAddressLine2: { type: String, required: false },
    PostCode: { type: String, required: true },
    City: { type: String, required: true },
    Image: { type: String, required: false }
});
// Apply the uniqueValidator plugin to userSchema.
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sites', siteSchema);