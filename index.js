/*
	Server startup file
*/

// Imports the implemented RESTful API
var tas = require('./tas');

// Starts server
tas().listen(process.env.PORT || 3000);
console.log('Server up and running...');
