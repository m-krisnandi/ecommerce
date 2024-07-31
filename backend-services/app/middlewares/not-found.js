const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
    res.status(404).send({
        success: false,
        message: "Route does not exist",
        code: StatusCodes.NOT_FOUND,
    });
};

module.exports = notFound;
