const bcrypt = require("bcryptjs");
const Users = require("../../api/v1/users/model");
const Products = require("../../api/v1/products/model");
const Address = require("../../api/v1/address/model");
const { BadRequestError } = require("../../errors");

// Get customer
const customerProfile = async (req) => {
    const { id } = req.user;
    const profile = await Users.findOne({ _id: id })
        .populate("address")
        .populate("favorite")
        .populate("cart.product");

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

    const result = await Users.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
        runValidators: true,
    });

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

    let favorite = profile.favorite;
    const isExist = favorite.some(
        (item) => item._id.toString() === product._id.toString()
    );

    if (!isExist) {
        favorite.push(product);
        profile.favorite = favorite;
        await profile.save();
    }

    return profile.favorite;
};

// Delete Favorite
const deleteFavoriteItem = async (req) => {
    const { id } = req.user;
    const profile = await Users.findOne({ _id: id }).populate("favorite");

    const product = await Products.findById(req.params.id);

    let favorite = profile.favorite;
    const itemIndex = favorite.findIndex(
        (item) => item._id.toString() === product._id.toString()
    );

    if (itemIndex > -1) {
        favorite.splice(itemIndex, 1);
        profile.favorite = favorite;
        await profile.save();
    }

    return profile.favorite;
};

// Manage cart
const updateCart = (cartItems, cartItem, isRemove) => {
    let isExist = false;
    
    cartItems.forEach((item) => {
        if (item.product._id.toString() === cartItem.product._id.toString()) {
            if (isRemove) {
                // Remove item from cart
                const index = cartItems.indexOf(item);
                if (index > -1) {
                    cartItems.splice(index, 1);
                }
            } else {
                // Update item quantity and check stock
                if (item.unit + cartItem.unit > cartItem.product.unit) {
                    throw new BadRequestError('Requested quantity exceeds stock availability');
                }
                item.unit = item.unit + cartItem.unit;
            }
            isExist = true;
        }
    });

    // Add new item if it does not exist and no removal
    if (!isExist && !isRemove) {
        if (cartItem.unit > cartItem.product.unit) {
            throw new BadRequestError('Requested quantity exceeds stock availability');
        }
        cartItems.push(cartItem);
    }
};

const addToCart = async (req, isRemove) => {
    const { id } = req.user;
    const { qty, _id } = req.body;

    // Fetch the user's profile and the product details
    const profile = await Users.findOne({ _id: id }).populate("cart.product");
    const product = await Products.findById(_id);

    // Check stock availability
    if (product.unit < qty && !isRemove) {
        throw new BadRequestError('Insufficient stock');
    }

    const cartItem = {
        product,
        unit: qty,
    };

    let cartItems = profile.cart || [];

    // Update the cart
    updateCart(cartItems, cartItem, isRemove);

    profile.cart = cartItems;
    const cartSaveResult = await profile.save();

    return cartSaveResult.cart;
};

const deleteFromCart = async (req) => {
    const { id } = req.user;  // Get user ID from request
    const productId = req.params.id;  // Get product ID from request parameters

    // Fetch the user's profile and product details
    const profile = await Users.findOne({ _id: id }).populate("cart.product");
    const product = await Products.findById(productId);

    if (!profile || !product) {
        throw new Error('Profile or Product not found');
    }

    let cartItems = profile.cart;

    // Find the index of the item in the cart
    const itemIndex = cartItems.findIndex(
        (item) => item.product._id.toString() === product._id.toString()
    );

    if (itemIndex > -1) {
        // Remove the item from the cart
        cartItems.splice(itemIndex, 1);
        profile.cart = cartItems;

        // Save the updated profile
        await profile.save();
    }

    return profile.cart;
};

module.exports = {
    customerProfile,
    createAddress,
    updateCustomer,
    deleteCustomer,
    favorite,
    addFavoriteItem,
    deleteFavoriteItem,
    addToCart,
    deleteFromCart
};
