const express = require("express");
const router = express.Router();
const { Products } = require('../db')

router.get("/", async (req, res, next) => {
	try {
		res.send(await Products.getAllProducts());
	} catch (error) {
		console.error("Error fetching all products from db: ", error);
	}
});

router.get("/products/:id", async (req, res, next) => {
	try {
		res.send(await Products.getProductById());
	} catch (error) {
		console.error("Error fetching single product from db: ", error);
	}
});

module.exports = router;