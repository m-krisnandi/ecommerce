const express = require("express");
const {
    create,
    findAll,
    findOne,
    update,
    destroy,
    addFavorite,
    addCart,
    deleteFavorite,
    deleteCart,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middlewares/auth");

const router = express.Router();

router.put(
    "/favorite",
    authenticateUser,
    authorizeRoles("admin", "customer"),
    addFavorite
);
router.delete(
    "/favorite/:id",
    authenticateUser,
    authorizeRoles("admin", "customer"),
    deleteFavorite
);

router.put(
    "/cart",
    authenticateUser,
    authorizeRoles("admin", "customer"),
    addCart
);
router.delete(
    "/cart/:id",
    authenticateUser,
    authorizeRoles("admin", "customer"),
    deleteCart
);

router.get("/products", findAll);
router.get("/products/:id", findOne);
router.post("/products", authenticateUser, authorizeRoles("admin"), create);
router.put("/products/:id", authenticateUser, authorizeRoles("admin"), update);
router.delete("/products/:id", authenticateUser, authorizeRoles("admin"), destroy);

module.exports = router;
