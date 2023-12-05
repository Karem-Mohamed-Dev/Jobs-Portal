const Job = require("../models/Job");
const { errorHandler } = require("../utils/error");

exports.getAllJobs = async (req, res, next) => {
    const page = +req.query.page || 1;
    const pageLimit = 20;
    const jobFilter = ["-__v", "-updatedAt"];
    const companyFilter = ['name', 'profileUrl'];

    try {
        const count = await Job.countDocuments();
        const jobs = await Job.find({}, jobFilter).skip((page - 1) * pageLimit).limit(pageLimit).populate("company", companyFilter);
        res.status(200).json({ total: count, result: jobs.length, page, jobs });
    } catch (error) {
        next(error);
    }
}

exports.getJob = async (req, res, next) => {
    const { jobId } = req.params;
    const jobFilter = ["-__v", "-updatedAt"];
    const companyFilter = ["name", "profileUrl"];

    try {
        const job = await Job.findById(jobId, jobFilter).populate("company", companyFilter);
        if (!job) return next(errorHandler(404, "Job with this id was not found"));
        res.status(200).json(job);
    } catch (error) {
        next(error)
    }
}

exports.jobSearch = async (req, res, next) => {
    const { jobTitle, salary, location, jobType, experienceLevel } = req.query;
    const page = +req.query.page || 1;
    const pageLimit = 20;
    const jobFilter = ["-__v", "-updatedAt"];
    const companyFilter = ['name', 'profileUrl'];
    const sort = req.query.sort || "-createdAt"

    const query = {};

    if (jobTitle) query.jobTitle = { "$regex": jobTitle, "$options": "i" };
    if (salary) query.salary = { "$gte": salary };
    if (location) query.location = { "$regex": location, "$options": "i" };
    if (jobType) query.jobType = jobType;
    if (experienceLevel) query.experienceLevel = { "$regex": experienceLevel, "$options": "i" };

    try {
        const count = await Job.countDocuments(query);
        const jobs = await Job.find(query, jobFilter).sort(sort).skip((page - 1) * pageLimit).limit(pageLimit).populate("company", companyFilter);
        res.status(200).json({ result: count, jobs });
    } catch (error) {
        next(error);
    }
}
