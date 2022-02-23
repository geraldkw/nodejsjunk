const {readFile,writeFile} = require('fs');
console.log("start");
readFile('./content/first.txt', 'utf8', (err, result) => {
	if (err) {
		console.log(err);
		return null;
	} 
	const first = result;
	readFile('./content/second.txt', 'utf8', (err, result) => {
		if (err) {
			console.log(err);
			return null;
		}
		const second = result;
		writeFile('./content/results.txt', `here is the result ${first} ${second}`,
		(err, result) => {
			if (err) {
				return;
			}
			console.log("done with this task");
		});
	})
})
console.log("starting next task");
