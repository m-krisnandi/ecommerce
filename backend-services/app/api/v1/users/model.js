const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name minimum 3 characters"],
            maxlength: [50, "Name maximum 50 characters"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password minimum 6 characters"],
            maxlength: [50, "Password maximum 50 characters"],
        },
        role: {
            type: String,
            enum: ["admin", "customer"],
            default: "admin",
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.salt;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    const User = this;
    if (User.isModified("password")) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model("User", userSchema);
