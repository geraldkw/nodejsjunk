require('dotenv').config()

const connectDB = require('./db/connect.js');

const product = require('./models/product.js');

const jsonProducts = require('./products.json');

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		await product.deleteMany();
		await product.create(jsonProducts);
		console.log('SUCCESS!!!!');
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

start()
