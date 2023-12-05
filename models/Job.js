const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    jobTitle: { type: String, required: [true, "Job Title Is Required"] },
    JobType: { type: String, required: [true, "Job Type Is Required"], enum: ["Full Time", "Part Time", "Intership", "Contract", "Freelance"] },
    location: { type: String, required: [true, "Location Is Required"] },
    salary: { type: Number, required: [true, "Salary Is Required"] },
    experienceLevel: { type: String, required: [true, "Experience Level Is Required"], enum: ["Intership", "Entry", "Junior", "Mid-Level", "Mid-Senior", "Senior", "Team Leader", "Manager"]  },
    description: { type: String, required: [true, "Description Is Required"] },
    requirements: { type: String, required: [true, "Requirements Is Required"] },
    applyLink: { type: String, required: [true, "Apply Link Is Required"] }
}, { timestamps: true })

module.exports = model("Job", jobSchema);