var keypairs = require('ripple-keypairs');

exports.testFunction = function() {
	var seed = (process.argv.length==3) ? process.argv[2] : keypairs.generateSeed();
	console.log("Testing seed generator: " + seed);
}
