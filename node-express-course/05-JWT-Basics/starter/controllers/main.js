//check for username, password in the requrest
//if exist create new JWT
//send back to front end
//
//set up authentication so only requests with JWT can access the dashboard
//
const jwt = require('jsonwebtoken')
const {BadRequest} = require('../errors')

const login = async (req, res) => { 
	const {username, password} = req.body
	//other options for below validation, Mongoose validation, Joi(another validation pkg)
	if (!username || !password) {
		throw new BadRequest('Please provide email and password');
	}
	const id = new Date().getDate() //for example only
	const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})
	res.status(200).json({msg: 'user created',token});
}

const dashboard = async (req, res) => {
	console.log(req.user);
	const luckyNumber = Math.floor(Math.random()*100)
	res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is number ${luckyNumber}`})
}

module.exports = {
	login, dashboard
}
