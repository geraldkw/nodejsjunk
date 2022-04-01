const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notfound.js');
const errorHandlerMiddleware = require('./middleware/errorHandler.js');
require('dotenv').config();

//middleware
app.use(express.static('./public'));
app.use(express.json()); //gives data in req.body

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`server is listening on port: ${port}`));
	} catch (error) {
		console.log(error);
	}
}

start();


