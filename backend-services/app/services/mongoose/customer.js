const bcrypt = require('bcryptjs')
const Users = require("../../api/v1/users/model");
const Products = require("../../api/v1/products/model");
const Address = require("../../api/v1/address/model");

// Get customer
const customerProfile = async (req) => {
    const { id } = req.user;
    const profile = await Users.findOne({ _id: id })
        .populate("address")
        .populate("favorite");

    return profile;
};

const createAddress = async (req) => {
    const { id } = req.user;
    const profile = await Users.findOne({ _id: id });

    const { street, postalCode, city, country } = req.body;

    if (profile) {
        const newAddress = new Address({
            street,
            postalCode,
            city,
            country,
        });

        await newAddress.save();

        profile.address.push(newAddress);
    }

    return await profile.save();
};

const updateCustomer = async (req) => {
    const { id } = req.user;
    const { name, password, phone, role, confirmPassword, email } = req.body;

    const check = await Users.findOne({
        email,
        _id: { $ne: id },
    });

    if (check) throw new BadRequestError("Email already exist");

    if (password !== confirmPassword) {
        throw new BadRequestError("Password and confirmPassword not match");
    }

    // Prepare the update object
    let updateData = { name, email, phone, role };

    // If a new password is provided, hash it and add to update data
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        updateData.password = hashedPassword;
    }

    const result = await Users.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError("User not found");

    return result;
};

const deleteCustomer = async (req) => {
    const { id } = req.user;

    const result = await Users.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError("User not found");

    await result.deleteOne({ _id: id });

    return result;
};


// Get Favorite
const favorite = async (req) => {
    const { id } = req.user;
    const profile = await Users.findOne({ _id: id }).populate("favorite");

    return profile.favorite;
};

// Add Favorite
const addFavoriteItem = async (req) => {
    const { id } = req.user;
    const profile = await Users.findOne({ _id: id }).populate("favorite");

    const product = await Products.findById(req.body._id);

    if (profile) {
        let favorite = profile.favorite;

        if (favorite.length > 0) {
            let isExist = false;
            favorite.map((item) => {
                if (item._id.toString() === product._id.toString()) {
                    const index = favorite.indexOf(item);
                    favorite.splice(index, 1);
                    isExist = true;
                }
            });

            if (!isExist) {
                favorite.push(product);
            }
        } else {
            favorite.push(product);
        }

        profile.favorite = favorite;
    }

    const profileResult = await profile.save();

    return profileResult.favorite;
};

module.exports = {
    customerProfile,
    createAddress,
    updateCustomer,
    deleteCustomer,
    favorite,
    addFavoriteItem,
};
