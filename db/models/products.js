const client = require("../client");

async function createProduct({ name, description, price, stock }) {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
      INSERT INTO products (name, description, price, stock)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
			[name, description, price, stock]
		);

		return product;
	} catch (error) {
		console.error("createProduct: error creating product: ", error);
	}
}

async function getAllProducts() {
	try {
		const { rows: products } = await client.query(`
      SELECT *
      FROM products;
    `);
		return products;
	} catch (error) {
		console.error("getAllProducts: error getting all products: ", error);
	}
}

async function getProductById(id) {
	try {
		const { rows: [product] } = await client.query(`
	  SELECT *
	  FROM products
	  WHERE id =  ${id}
	  `);

		return product;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createProduct,
	getAllProducts,
	getProductById
};
