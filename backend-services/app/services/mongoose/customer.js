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
    favorite,
    addFavoriteItem,
};
