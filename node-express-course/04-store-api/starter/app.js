require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error-handler.js');
const notFoundMiddleware = require('./middleware/not-found.js');

const connectDB = require('./db/connect');
const productRouter = require('./routes/products.js');

//middleware
app.use(express.json());
app.use('/api/v1/products', productRouter);

//routes
app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">product route</a>');
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`server listening to port ${port}`));
		
	} catch (error) {
		console.log(error);
	}
}

start();
