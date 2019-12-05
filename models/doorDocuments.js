var mongoose = require('mongoose');
 
// Define your schema as normal.
var doorDocSchema = mongoose.Schema({
    DoorID: { type: String, required: true },
    DocumentTitle: { type: String, required: true },
    Document: { type: String, required: true },
    DateTime: { type: String, required: true }
});
 
module.exports = mongoose.model('DoorDocuments', doorDocSchema);