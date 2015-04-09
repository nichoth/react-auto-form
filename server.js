var http = require('http'),
    ecstatic = require('ecstatic');

var port = process.argv[2] || 8000;

http.createServer(
  ecstatic({ root: __dirname + '/example' })
).listen(8000);

console.log('Listening on '+port);
