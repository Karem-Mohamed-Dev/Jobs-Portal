const Seeker = require("../models/Seeker");
const Company = require("../models/Company");
const { errorHandler } = require('../utils/error');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id, role) => {
    const token = jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: '3d' })
    return token;
}

exports.seekerLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
    return next(errorHandler(400, "All field are required"));

    if (!validator.isEmail(email))
        return next(errorHandler(400, "Invalid email"));

    if (password.length < 6)
        return next(errorHandler(400, "Password must be more than 6"));

    const seeker = await Seeker.findOne({ email: email });
    if (!seeker)
        return next(errorHandler(404, "User Not Found"));

    const validPass = await bcrypt.compare(password, seeker.password);
    if (!validPass)
        return next(errorHandler(400, "Email or password are wrong"));

    const { password: pass, ...rest } = seeker._doc;

    const token = createToken(seeker._id, 'seeker');

    res.status(200).json({...rest, token})
}

exports.seekerRegister = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
        return next(errorHandler(400, "All field are required"));

    if (!validator.isEmail(email))
        return next(errorHandler(400, "Invalid email"));

    if (password.length < 6)
        return next(errorHandler(400, "Password must be more than 6"));

    const exists = await Seeker.findOne({ email: email });
    console.log(exists)
    if (exists)
        return next(errorHandler(400, "User already exists"));


    const hash = await bcrypt.hash(password, 10);

    const seeker = await Seeker.create({ firstName, lastName, email, password: hash });

    const token = createToken(seeker._id, seeker.accountType);
    await seeker.save();

    const { password: pass, ...rest } = seeker._doc;

    res.status(200).json({
        ...rest,
        token
    })
}

exports.companyLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
    return next(errorHandler(400, "All field are required"));

    if (!validator.isEmail(email))
        return next(errorHandler(400, "Invalid email"));

    if (password.length < 6)
        return next(errorHandler(400, "Password must be more than 6"));

    const company = await Company.findOne({ email: email });
    if (!company)
        return next(errorHandler(404, "User Not Found"));

    const validPass = await bcrypt.compare(password, company.password);
    if (!validPass)
        return next(errorHandler(400, "Email or password are wrong"));

    const { password: pass, ...rest } = company._doc;

    const token = createToken(company._id, company.accountType);

    res.status(200).json({...rest, token})
}

exports.companyRegister = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return next(errorHandler(400, "All field are required"));

    if (!validator.isEmail(email))
        return next(errorHandler(400, "Invalid email"));

    if (password.length < 6)
        return next(errorHandler(400, "Password must be more than 6"));

    const exists = await Company.findOne({ email: email });
    console.log(exists)
    if (exists)
        return next(errorHandler(400, "User already exists"));


    const hash = await bcrypt.hash(password, 10);

    const company = await Company.create({ name, email, password: hash });

    const token = createToken(company._id, company.accountType);
    await company.save();

    const { password: pass, ...rest } = company._doc;

    res.status(200).json({
        ...rest,
        token
    })
}