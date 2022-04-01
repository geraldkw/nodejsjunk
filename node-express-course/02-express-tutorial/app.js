const express = require('express');
const logger = require('./logger.js');
const authorize = require('./authorize.js');
const app = express();
const morgan = require("morgan");
const people = require('./routes/people.js');
const auth = require('./routes/auth.js');
//static assets
app.use(express.static('./methods-public'));

//parse form data
app.use(express.urlencoded({extended: false}));
app.use('/api/people', people);
app.use('/login', auth);

app.listen(5000, ()=> {
	console.log('server listening on port 5000');
});
