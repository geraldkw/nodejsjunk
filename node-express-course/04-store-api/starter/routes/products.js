const express = require('express');
const productRouter = express.Router();

const {getAllProducts,getAllProductsStatic} = require('../controllers/products.js');

productRouter.route('/').get(getAllProducts);
productRouter.route('/static').get(getAllProductsStatic);

module.exports = productRouter;
