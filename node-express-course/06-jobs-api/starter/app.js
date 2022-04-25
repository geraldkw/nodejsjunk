require('dotenv').config();
require('express-async-errors');

const rateLimiter = require('express-rate-limit');
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect.js');

//routers
const authRouter = require('./routes/auth.js');
const jobsRouter = require('./routes/jobs.js');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//auth middleware
authenticateUser = require('./middleware/authentication')
app.use(express.json());
// extra packages
app.set('trust proxy', 1); //needed for Heroku
app.use(rateLimiter({
	windowsMS: 15*60*1000, //15minutes
	max: 100, //100 hits per windowsMS
}))
app.use(helmet())
app.use(cors())
app.use(xss())
// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	await connectDB(process.env.MONGO_URI)
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
