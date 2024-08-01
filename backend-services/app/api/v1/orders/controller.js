const { StatusCodes } = require("http-status-codes");
const { getOrders, createNewOrder } = require("../../../services/mongoose/order");
const sendResponse = require("../../../utils/response-api");

const findAll = async (req, res, next) => {
    try {
        const result = await getOrders(req);
        sendResponse(res, StatusCodes.OK, true, result, "Get Orders");
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createNewOrder(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            result,
            "Order created successfully"
        );
    } catch (error) {
        next(error);
    }
};

module.exports = { findAll, create };
