const express = require("express");
const ProductController = require("../controllers/product_controler");

const router = express.Router();
router.get("/", ProductController.index);
router.get("/add", ProductController.addForm);
router.post("/add", ProductController.create);
router.get("/edit/:id", ProductController.editForm);
router.post("/edit/:id", ProductController.update);
router.post("/delete/:id", ProductController.delete); 



module.exports = router;
