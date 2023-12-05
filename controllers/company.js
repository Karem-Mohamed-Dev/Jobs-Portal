const Company = require("../models/Company");
const Job = require("../models/Job");
const { errorHandler } = require("../utils/error");

exports.getCompanyDetails = async (req, res, next) => {
    const { companyId } = req.params;
    const compantFilter = ["-password", "-updatedAt", "-__v"];
    const jobFilter = ["-company", '-application', '-__v', "-updatedAt"];

    try {
        const company = await Company.findById(companyId, compantFilter).populate("jobPosts", jobFilter);
        if (!company) return next(errorHandler(404, "Company with this id was not found"));
        res.status(200).json(company)
    } catch (error) {
        next(error);
    }
}

exports.updateCompany = async (req, res, next) => {
    const user = req.user;
    const { name, email, about, location, profileUrl, contact } = req.body;
    const query = {};

    if (user.role !== 'company')
        return next(errorHandler(401, "Not Authorized"))

    if (name)
        query.name = name;

    if (email)
        query.email = email;

    if (about)
        query.about = about;

    if (location)
        query.location = location;

    if (profileUrl)
        query.profileUrl = profileUrl;

    if (contact)
        query.contact = contact;


    try {
        let company = await Company.findOneAndUpdate({ _id: user._id }, query, {
            new: true
        });

        const { password: pass, ...rest } = company._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

exports.deleteCompany = async (req, res, next) => {
    const user = req.user;
    try {
        await Company.findByIdAndDelete(user._id);
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        next(error);
    }
}

exports.getJob = async (req, res, next) => {
    res.send("Get Job");
}

exports.addJob = async (req, res, next) => {
    const user = req.user;
    const { jobTitle, JobType, location, salary, description, requirements, experienceLevel, applyLink } = req.body;

    if (user.role !== "company")
        return next(errorHandler(401, "Not Authorized"))

    if (!jobTitle || !JobType || !location || !salary || !description || !requirements || !experienceLevel || !applyLink)
        next(errorHandler(400, "All fields are required"))


    try {
        const data = { company: user._id, jobTitle, JobType, location, salary, description, requirements, experienceLevel, applyLink }

        const job = await Job.create(data);
        const company = await Company.findById(user._id);

        company.jobPosts.push(job._id);
        await company.save();

        res.status(201).json(job);
    } catch (error) {
        next(error);
    }
}

exports.editJob = async (req, res, next) => {
    const user = req.user;
    const { jobId } = req.params;
    const { jobTitle, JobType, location, salary, description, requirements } = req.body;
    const query = {};



    if (jobTitle) query.jobTitle = jobTitle;
    if (JobType) query.JobType = JobType;
    if (location) query.location = location;
    if (location) query.location = location;
    if (salary) query.salary = salary;
    if (description) query.description = description;
    if (requirements) query.requirements = requirements;

    try {
        const job = await Job.findById(jobId);

        if (user._id !== job.company.toString()) return next(errorHandler(401, "Not Authorized"));

        if (!job)
            return next(errorHandler(404, "Job with this id not found"));

        const result = await Job.findOneAndUpdate({ _id: jobId }, query, { new: true });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

exports.deleteJob = async (req, res, next) => {
    const user = req.user;
    const { jobId } = req.params;


    try {
        const job = await Job.findById(jobId);

        if (!job)
            return next(errorHandler(404, "Not Found"));

        if (job.company.toString() !== user._id)
            return next(errorHandler(401, "Not Authorized"));

        await Job.deleteOne({ _id: jobId })

        res.status(200).json({ msg: "Job Deleted" });
    } catch (error) {
        next(error);
    }
}