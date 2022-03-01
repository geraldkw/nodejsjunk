const EventEmitter = require('events');

const customEmitter = new EventEmitter();

customEmitter.on('response', (name, id)=> {
	console.log(`data received. User: ${name} ID: ${id}`);
})

customEmitter.on('response', ()=> {
	console.log(`some other logic here `);
})

customEmitter.emit('response', 'john', 34);
