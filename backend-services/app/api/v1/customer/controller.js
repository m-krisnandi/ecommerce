const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../../utils/response-api");
const { favorite, customerProfile, createAddress, updateCustomer, deleteCustomer } = require("../../../services/mongoose/customer");

// Find Customer Profile
const findCustomerProfile = async (req, res, next) => {
    try {
        const result = await customerProfile(req);
        sendResponse(res, StatusCodes.OK, true, result, "Get Profile");
    } catch (error) {
        next(error);
    }
};

// Update Customer
const updateCustomerProfile = async (req, res, next) => {
    try {
        const result = await updateCustomer(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            result,
            "User updated successfully"
        );
    } catch (error) {
        next(error);
    }
};

// Delete Customer
const deleteCustomerProfile = async (req, res, next) => {
    try {
        await deleteCustomer(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            {},
            "User deleted successfully"
        );
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
    updateCustomerProfile,
    deleteCustomerProfile,
    findFavorite
};