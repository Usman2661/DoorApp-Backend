var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
 
// Define your schema as normal.
var doorSchema = mongoose.Schema({
    BuildingID: { type: String, required: true },
    DoorName: { type: String, required: true },
    DoorLocation: { type: String, required: true },
    DateTimeCreated: { type: String, required: true },
    Image: { type: String, required: false }
});
 
module.exports = mongoose.model('Door', doorSchema);