const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../../utils/response-api");
const {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../../../services/mongoose/products");
const { addFavoriteItem, deleteFavoriteItem, addToCart, deleteFromCart } = require("../../../services/mongoose/customer");

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

// Delete Favorite
const deleteFavorite = async (req, res, next) => {
    try {
        const result = await deleteFavoriteItem(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            result,
            "Favorite deleted successfully"
        );
    } catch (error) {
        next(error);
    }
};

// Add Cart
const addCart = async (req, res, next) => {
    try {
        const result = await addToCart(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            result,
            "Cart added successfully"
        );
    } catch (error) {
        next(error);
    }
};

// Delete Cart
const deleteCart = async (req, res, next) => {
    try {
        const result = await deleteFromCart(req);
        sendResponse(
            res,
            StatusCodes.OK,
            true,
            result,
            "Cart deleted successfully"
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
    addFavorite,
    deleteFavorite,
    addCart,
    deleteCart
};
