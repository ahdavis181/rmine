const keypairs = require('ripple-keypairs');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

exports.testFunction = function() {
	var seed = (process.argv.length==3) ? process.argv[2] : keypairs.generateSeed();
	console.log("Testing seed generator: " + seed);
}

exports.searchTermsFromCSV = function(path) {
	var CSVFileContents = fs.readFileSync(path).toString();
	console.log(CSVFileContents);
	var searchTerms = [];
	var searchTermDataRows = parse(CSVFileContents, {auto_parse: true}).forEach(function(searchTermDataRow) {
		searchTerms.push(new SearchTerm(searchTermDataRow));
	});
	searchTerms.splice(0,1);
	console.log(searchTerms);
	return searchTerms;
}

function SearchTerm (searchTermData) {
	this.searchString = searchTermData[0];
	this.caseSensitive = Boolean(searchTermData[1]);
	this.searchIndex = parseInt(searchTermData[2]);
}
