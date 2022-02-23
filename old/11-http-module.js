const http = require('http');

const server = http.createServer((req,res)=>{
	if (req.url === '/') {
		res.end('Welcome to our homepage');
	}
	if (req.url === '/about') {
		res.end('here is our short history');
	}
	//res.end("<h1>Oops!</h1> <p>Can't find page</p>");
})

server.listen(5000)
