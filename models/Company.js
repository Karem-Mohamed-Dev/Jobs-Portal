const { Schema, model } = require("mongoose");

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, "First Name Is Required"],
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password Is Required"],
        minlength: [6, "Password Must Be At Least 6"]
    },
    accountType: {
        type: String,
        default: 'company'
    },
    about: { type: String, default: "" },
    contact: [{ name: { type: String }, link: { type: String } }],
    location: { type: String, default: "" },
    profileUrl: { type: String, default: "" },
    jobPosts: [{ type: Schema.Types.ObjectId, ref: "Job" }],
}, { timestamps: true })

module.exports = model("Company", companySchema);