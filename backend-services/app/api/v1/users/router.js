const express = require("express");
const {
    create,
    findAll,
    findOne,
    update,
    destroy,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middlewares/auth");

const router = express.Router();

router.post("/users", create);
router.get("/users", authenticateUser, authorizeRoles("admin"), findAll);
router.get("/users/:id", authenticateUser, authorizeRoles("admin"), findOne);
router.put("/users/:id", authenticateUser, authorizeRoles("admin"), update);
router.delete("/users/:id", authenticateUser, authorizeRoles("admin"), destroy);


module.exports = router;
