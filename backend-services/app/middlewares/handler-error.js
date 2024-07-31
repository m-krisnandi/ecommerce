const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default error
        success: false,
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong",
    };

    // error validation dari mongoose
    if (err.name === "ValidationError") {
        customError.success = false;
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // error duplicate key
    if (err.code && err.code === 11000) {
        customError.success = false;
        customError.message = `Duplicate field value entered for ${Object.keyValue} field, please use another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.name === "CastError") {
        customError.success = false;
        customError.message = `Item not found with id : ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customError.statusCode).json({
        success: customError.success,
        message: customError.message,
        code: customError.statusCode,
    });
};

module.exports = errorHandlerMiddleware;
