var casper = require('casper').create();
var links;

function getLinks() {
	var links = document.querySelectorAll('img');
	return Array.prototype.map.call(links, function (e) {
		return e.getAttribute('src')
	});
}

casper.start('https://www.google.co.in/search?q='+ casper.cli.get('query') +'&tbm=isch');

casper.then(function () {
	links = this.evaluate(getLinks);
});

casper.run(function () {
	var fileName = casper.cli.get('query');
	fileName = fileName.replace(/\W+/g, "");
	for(var i in links) {
		if(i<3){
		this.download(links[i], "./downloads/"+ fileName + i + ".png");
		console.log(fileName + i + ".png");
	}
}
casper.done();
});