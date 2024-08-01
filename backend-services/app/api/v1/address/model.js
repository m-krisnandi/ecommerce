const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: {
        type: String,
        required: [true, "Street is required"],
    },
    postalCode: {
        type: String,
        required: [true, "Postal Code is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
});

module.exports = mongoose.model("address", AddressSchema);
