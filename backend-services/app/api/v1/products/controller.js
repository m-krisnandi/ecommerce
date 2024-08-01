const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../../utils/response-api");
const {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../../../services/mongoose/products");
const { addFavoriteItem } = require("../../../services/mongoose/users");

const create = async (req, res, next) => {
    try {
        const result = await createProduct(req);
        sendResponse(
            res,
            StatusCodes.CREATED,
            true,
            result,
            "Product created successfully"
        );
    } catch (error) {
        next(error);
    }
};

const findAll = async (req, res, next) => {
    try {
        const result = await getAllProducts(req);
        sendResponse(res, StatusCodes.OK, true, result, "Get All Products");
    } catch (error) {
        next(error);
    }
};

const findOne = async (req, res, next) => {
    try {
        const result = await getProductById(req);
        sendResponse(res, StatusCodes.OK, true, result, "Get Product By Id");
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateProduct(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            result,
            "Product updated successfully"
        );
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        await deleteProduct(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            {},
            "Product deleted successfully"
        );
    } catch (error) {
        next(error);
    }
};

// Add Favorite
const addFavorite = async (req, res, next) => {
    try {
        const result = await addFavoriteItem(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            result,
            "Favorite added successfully"
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
    addFavorite
};
