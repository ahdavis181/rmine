var keypairs = require('ripple-keypairs');

exports.testFunction = function() {
	console.log("Testing seed generator: " + keypairs.generateSeed());
}
