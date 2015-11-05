'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 5678;

var server = _http2.default.createServer(function (req, res) {
  var urlParams = _url2.default.parse(req.url, true);
  var pathParts = [];
  urlParams.path.split('/').map(function (a) {
    if (a) pathParts.push(a);
  });
  switch (pathParts[0]) {
    case 'time':
      var date = new Date();
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(date.toString());
      res.end();
      break;
    case 'greet':
      switch (req.method) {
        case 'GET':
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('Hello, ' + pathParts[1].toString());
          res.end();
          break;
        case 'POST':
          res.writeHead(200);
          var reqBody;
          req.on('data', function (chunk) {
            reqBody += chunk;
          });
          req.on('end', function () {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            var p = JSON.parse(reqBody.split('undefined')[1]);
            if (p['name']) res.write('Hello, ' + p['name']);
            res.end();
          });
          break;
      }
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('I don\'t know what %s is', urlParams.pathname);
      break;
  }
});

server.listen(port, function (err) {
  console.log('Server started on port ' + port + '; Ctrl c to stop.');
  if (err) console.log(err);
});