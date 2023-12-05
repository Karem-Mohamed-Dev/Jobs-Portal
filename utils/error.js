exports.errorHandler = (statusCode, msg) => {
    const error = new Error();
    error.statusCode = statusCode || 500;
    error.message = msg || "Something Went Wrong";
    return error;
}