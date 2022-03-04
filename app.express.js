const express = require('express');

const app = express();

const {products} = require('./data.js');

app.get('/', (req, res) => {
	res.send('<h1>Home Page</h1><a href="/api/products">Products</a>');
});

app.get('/api/products', (req, res) => {
	const newProducts = products.map((product)=>{
		const {id, name, image} = product;
		return {id, name, image};
	})
	res.json(newProducts);
});

app.get('/api/products/:productId', (req, res) => {
	//console.log(req.params);
	const {productId} = req.params;
	const singleProduct = products.find((product)=> product.id === Number(productId));

	if (!singleProduct) {
		return res.status(404).send('Product does not exist');
	}
	res.json(singleProduct);
});

app.get('/api/products/:productId/reviews/:reviewId', (req, res) => {
	console.log(req.params);
});

app.get('/api/v1/query', (req, res) => {
	const {search, limit} = req.query;
	let sortedProducts = [...products];

	if (search) {
		sortedProducts = sortedProducts.filter((product)=> {
			return product.name.startsWith(search);
		})
	}

	if (limit) {
		sortedProducts = sortedProducts.slice(0,Number(limit));
	}
	res.status(200).json(sortedProducts);
	//change

})

app.listen(5000, ()=> {
	console.log('server listening on port 5000');
});
