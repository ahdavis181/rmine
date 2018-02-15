const rippleKeypairs = require('ripple-keypairs');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

exports.searchTermsFromCSV = function(path) {
	var CSVFileContents = fs.readFileSync(path).toString();
	var searchTerms = [];
	var i = 0;
	var searchTermDataRows = parse(CSVFileContents, {auto_parse: true}).forEach(function(searchTermDataRow) {
		if (i != 0) {
			searchTerms.push(new SearchTerm(searchTermDataRow)); 
		}
		i ++;
	});
	return searchTerms;
}

function SearchTerm (searchTermData) {
	this.searchString = searchTermData[0];
	this.caseSensitive = parseBoolean(searchTermData[1]);
	this.searchIndex = parseInt(searchTermData[2]);
}

exports.mine = function(searchTerms,walletDirectory) {
	while(true) {	
		var keypair = rippleKeypairs.deriveKeypair(rippleKeypairs.generateSeed());
		keypair.address = rippleKeypairs.deriveAddress(keypair.publicKey);
		searchTerms.forEach(function (searchTerm) {
			process.stdout.write('Mining... ' + keypair.address + '    \r');
			if (checkForSearchTerm(keypair.address,searchTerm)) {
				console.log('Found a match! ' + keypair.address + ' ' + searchTerm.searchString);
				exportKeypair(keypair,walletDirectory);
			}
		});
	}
}

function checkForSearchTerm(address, searchTerm) {
	var indexOfString = -1;
	if (searchTerm.caseSensitive) {
		indexOfString = address.indexOf(searchTerm.searchString);
	} else {
		indexOfString = address.toLowerCase().indexOf(searchTerm.searchString.toLowerCase());
	}

	if (indexOfString == -1) {
		return false;
	} else {
		if (searchTerm.searchIndex == 1) {
			if (indexOfString == 1) { // 1 Corresponds to the index after the prefix 'r'.
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}

function exportKeypair(keypair,walletDirectory) {
	fs.writeFileSync(walletDirectory + keypair.address + '.ripplewallet', JSON.stringify(keypair, null, " "));
}

function parseBoolean(string) {
	if (string.toLowerCase() === 'true') {
		return true;
	} else if (string.toLowerCase() === 'false') {
		return false;
	} else {
		throw "Unable to parse \"" + string + "\" as a boolean.";
	}
}
