const {readFile} = require('fs');

const getText = (path) => {
	return new Promise((resolve, reject) => {
		readFile('./content/first.txt', 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		})

	})
}


const start = async() => {
	const first = await getText('./content/first.txt');
}

start()
