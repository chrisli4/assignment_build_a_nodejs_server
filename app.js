var http = require('http');
var fs = require('fs');

var host = 'localhost';
var port = 3000;

var server = http.createServer((req, res) => {
	
	if(req.method === 'GET') {
		fs.readFile('./public/index.html', 'utf8', (err, data) => {
			if(err) {
				res.end(err);
			} else {

				res.writeHead(200, {
					"Content-Type": "text/html"
				});

				var reqObj = {
					"url" : req.url,
					"method" : req.method,
					"headers" : req.headers
				}

				var resObj = {
					"statusMessage" : res.statusMessage,
					"statusCode" : res.statusCode,
					"_header" : res._header
				}

				var resOutput = JSON.stringify(resObj, null, 2);
				var reqOutput = JSON.stringify(reqObj, null, 2);

				var replaced = data.replace('{{ res }}', resOutput).replace('{{ req }}', reqOutput);

				res.end(replaced);
			}
		});
	} else if (req.method === 'POST') {

		new Promise((resolve, reject) => {

			var jsonString = '';

			req.on('data', (data) => {
				console.log('Data:' + data);
			});

			req.on('end', () => {
				resolve('Done');
			});

			}).then((result) => {
				res.end(result);
				console.log(result);
		});
	}
});

server.listen(port, host, () => {
	console.log(`Server is listening on: http://${host}:${port}/`);
})