const express = require("express");
const { create, findAll, findOne, update, destroy } = require("./controller");

const router = express.Router();

router.post("/products", create);
router.get("/products", findAll);
router.get("/products/:id", findOne);
router.put("/products/:id", update);
router.delete("/products/:id", destroy);

module.exports = router;
