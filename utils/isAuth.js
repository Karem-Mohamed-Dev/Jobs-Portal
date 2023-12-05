const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

exports.isAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.includes('Bearer')) {
        next(errorHandler(401, "Authentication Faild"))
    }

    const token = authorization.split(" ")[1];

    try {

        const { _id, role } = jwt.verify(token, process.env.SECRET);
        
        req.user = { _id, role };

    } catch (error) {
        next(errorHandler(401, "Authentication Faild"))
    }
    next();
}