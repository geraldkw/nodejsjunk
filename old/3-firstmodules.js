//Modules
//Every file in node is a module by default because of CommonJS
const names = require('./4-names.js')
const sayHi = require('./5-utils.js')
require('./mind-grenade.js')

sayHi('susan')
sayHi(names.john)
sayHi(names.peter)
