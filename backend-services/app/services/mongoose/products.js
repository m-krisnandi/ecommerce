const Products = require("../../api/v1/products/model");
const { NotFoundError } = require("../../errors");
const BadRequestError = require("../../errors/bad-request");

const createProduct = async (req) => {
    const { name, desc, banner, type, unit, price, available, suplier } =
        req.body;

    const check = await Products.findOne({ name });

    if (check) throw new BadRequestError("Product name duplicate");

    const result = await Products.create({
        name,
        desc,
        banner,
        type,
        unit,
        price,
        available,
        suplier,
    });

    return result;
};

const getAllProducts = async (req) => {
    const result = await Products.find({});
    return result;
};

const getProductById = async (req) => {
    const { id } = req.params;

    const result = await Products.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError("Product not found");

    return result;
};

const updateProduct = async (req) => {
    const { id } = req.params;
    const { name, desc, banner, type, unit, price, available, suplier } =
        req.body;

    const check = await Products.findOne({
        name,
        _id: { $ne: id },
    });

    if (check) throw new BadRequestError("Product name duplicate");

    const result = await Products.findOneAndUpdate(
        {
            _id: id,
        },
        { name, desc, banner, type, unit, price, available, suplier },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError("Product not found");

    return result;
};

const deleteProduct = async (req) => {
    const { id } = req.params;

    const result = await Products.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError("Product not found");

    await result.deleteOne({ _id: id });

    return result;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
