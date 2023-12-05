const { Schema, model } = require("mongoose");

const seekerSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name Is Required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name Is Required"],
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password Is Required"],
        minLength: [6, "Password Must Be At Least 6"]
    },
    accountType: {
        type: String,
        default: 'seeker'
    },
    jobTitle: { type: String, default: "" },
    about: { type: String, default: "" },
    skills: [{ type: String }],
    contact: [{ text: { type: String }, link: { type: String } }],
    location: { type: String, default: "" },
    profileUrl: { type: String, default: "" },
}, { timestamps: true })

module.exports = model("Seeker", seekerSchema);