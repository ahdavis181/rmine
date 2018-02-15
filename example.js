var rmine = require('./index.js');

var searchTerms = rmine.searchTermsFromCSV('../rmine/searchTerms.csv');
console.log("Search terms: ");
console.log(searchTerms);

rmine.mine(searchTerms,'./wallets/');
