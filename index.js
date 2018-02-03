var keypairs = require('ripple-keypairs');

exports.testFunction = function() {
	console.log("testing. " + keypairs.generateSeed());
}
