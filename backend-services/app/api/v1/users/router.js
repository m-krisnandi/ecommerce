const express = require("express");
const { create, findAll, findOne, update, destroy } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth");

const router = express.Router();

router.post("/users", create);
router.get("/users", authenticateUser, authorizeRoles('admin'), findAll);
router.get("/users/:id", findOne);
router.put("/users/:id", update);
router.delete("/users/:id", destroy);

module.exports = router;
