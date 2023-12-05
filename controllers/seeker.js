const Seeker = require("../models/Seeker");
const { errorHandler } = require("../utils/error");

exports.updateSeeker = async (req, res, next) => {
    const user = req.user;
    const { firstName, lastName, email, about, jobTitle, location, profileUrl, contact } = req.body;
    const query = {};

    if (user.role !== "seeker")
        return next(errorHandler(401, "Not Authorized"))

    if (firstName) query.firstName = firstName;
    if (lastName) query.lastName = lastName;
    if (email) query.email = email;
    if (jobTitle) query.jobTitle = jobTitle;
    if (about) query.about = about;
    if (location) query.location = location;
    if (profileUrl) query.profileUrl = profileUrl;
    if (contact) query.contact = contact;

    try {

        const seeker = await Seeker.findOneAndUpdate({ _id: user._id }, query, {
            new: true
        });

        if (!seeker)
            return next(errorHandler(404, "User not found"));

        res.status(200).json(seeker);

    } catch (error) {
        next(error);
    }
}
exports.deleteSeeker = async (req, res, next) => {
    const user = req.user;
    try {
        const seeker = await Seeker.findById(user._id);
        if (!seeker)
            return next(errorHandler(404, "User not found"));

        await Seeker.deleteOne({ _id: user._id });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        next(error);
    }
}