const sendResponse = (res, statusCode, success, data, message) => {
    const response = {
        success,
        data,
        message,
        code: statusCode,
    };

    return res.status(statusCode).json(response);
};

module.exports = sendResponse;
