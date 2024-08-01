const express = require("express");
const { findAll, create } = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middlewares/auth");

const router = express.Router();

router.get(
    "/orders",
    authenticateUser,
    authorizeRoles("admin", "customer"),
    findAll
);
router.post(
    "/orders",
    authenticateUser,
    authorizeRoles("admin", "customer"),
    create
);

module.exports = router;
