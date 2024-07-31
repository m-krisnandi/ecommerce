const Users = require("../../api/v1/users/model");
const { BadRequestError } = require("../../errors");

const createUser = async (req, res) => {
    const { name, password, role, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError("Password and confirmPassword not match");
    }

    const result = await Users.create({
        name,
        email,
        password,
        role,
    });

    delete result._doc.password;

    return result;
};

const getAllUsers = async (req) => {
    const result = await Users.find();

    return result;
};

const getUserById = async (req) => {
    const { id } = req.params;

    const result = await Users.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError("User not found");

    return result;
};

const updateUser = async (req) => {
    const { id } = req.params;
    const { name, password, role, confirmPassword, email } = req.body;

    const check = await Users.findOne({
        email,
        _id: { $ne: id },
    });

    if (check) throw new BadRequestError("Email already exist");

    if (password !== confirmPassword) {
        throw new BadRequestError("Password and confirmPassword not match");
    }

    const result = await Users.findOneAndUpdate(
        {
            _id: id,
        },
        { name, email, password, role },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError("User not found");

    return result;
};

const deleteUser = async (req) => {
    const { id } = req.params;

    const result = await Users.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError("User not found");

    await result.deleteOne({ _id: id });

    return result;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
