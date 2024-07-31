const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../../utils/response-api");
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../../../services/mongoose/users");

const create = async (req, res, next) => {
    try {
        const result = await createUser(req);
        sendResponse(
            res,
            StatusCodes.CREATED,
            true,
            result,
            "User created successfully"
        );
    } catch (error) {
        next(error);
    }
};

const findAll = async (req, res, next) => {
    try {
        const result = await getAllUsers(req);
        sendResponse(res, StatusCodes.OK, true, result, "Get All Users");
    } catch (error) {
        next(error);
    }
};

const findOne = async (req, res, next) => {
    try {
        const result = await getUserById(req);
        sendResponse(res, StatusCodes.OK, true, result, "Get User By Id");
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateUser(req);
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

const destroy = async (req, res, next) => {
    try {
        await deleteUser(req);
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

module.exports = {
    create,
    findAll,
    findOne,
    update,
    destroy,
};
