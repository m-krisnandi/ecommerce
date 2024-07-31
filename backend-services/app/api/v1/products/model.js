const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name product must be required"],
    },
    desc: {
        type: String,
        required: [true, "Desc product must be required"],
    },
    banner: {
        type: String,
        required: [true, "Banner product must be required"],
    },
    type: {
        type: String,
        required: [true, "Type product must be required"],
    },
    unit: {
        type: Number,
        required: [true, "Unit product must be required"],
    },
    price: {
        type: Number,
        required: [true, "Price product must be required"],
    },
    available: {
        type: Boolean,
        required: [true, "Available product must be required"],
    },
    suplier: {
        type: String,
        required: [true, "Suplier product must be required"],
    },
});

module.exports = mongoose.model("product", ProductSchema);
