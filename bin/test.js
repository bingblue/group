var http = require("http");

http.createServer(function(request, response) {

	response.writeHead(200, {
		"Content-Type": "text/plain"
	});

	response.write("Hello World.");

	response.end();

}).listen(3000);
console.log("nodejs start listen 3000 port!");