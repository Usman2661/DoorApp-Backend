var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
 
// Define your schema as normal.
var userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype: { type: String, required: true },
    image: { type: String, required: false }
});
 
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', userSchema);
