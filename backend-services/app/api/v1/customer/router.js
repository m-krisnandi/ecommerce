const express = require("express");
const { findFavorite, findCustomerProfile, createCustomerAddress } = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middlewares/auth");

const router = express.Router();

router.get(
    "/customer/profile",
    authenticateUser,
    authorizeRoles("customer"),
    findCustomerProfile
);
router.post(
    "/customer/address",
    authenticateUser,
    authorizeRoles("customer"),
    createCustomerAddress
);
router.get(
    "/customer/favorite",
    authenticateUser,
    authorizeRoles("customer"),
    findFavorite
);

module.exports = router;
