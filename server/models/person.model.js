const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    age: { type: Number, required: [true, "Age is required"] },
    email: { type: String, required: [true, "Email is required"] },
}, { timestamps: true });

module.exports.Person = mongoose.model('Person', PersonSchema);