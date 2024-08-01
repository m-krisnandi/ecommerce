const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../../utils/response-api");
const { favorite, customerProfile, createAddress } = require("../../../services/mongoose/customer");

// Find Customer Profile
const findCustomerProfile = async (req, res, next) => {
    try {
        const result = await customerProfile(req);
        sendResponse(res, StatusCodes.OK, true, result, "Get Profile");
    } catch (error) {
        next(error);
    }
};

// Create Address
const createCustomerAddress = async (req, res, next) => {
    try {
        const result = await createAddress(req);
        sendResponse(
            res,
            StatusCodes.CREATED,
            true,
            result,
            "Address created successfully"
        );
    } catch (error) {
        next(error);
    }
};

// Find Favorite
const findFavorite = async (req, res, next) => {
    try {
        const result = await favorite(req);
        sendResponse(res, StatusCodes.OK, true, result, "Get Favorite");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    findCustomerProfile,
    createCustomerAddress,
    findFavorite
};