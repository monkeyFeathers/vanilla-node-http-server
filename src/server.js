'use strict';

import http from 'http';
import url from 'url';

const port = 5678;

let server = http.createServer((req, res) => {
  let urlParams = url.parse(req.url, true);
  let pathParts = [];
  urlParams.path.split('/').map(a => {
    if (a) {pathParts.push(a);}
  });
  switch (pathParts[0]) {
    case 'time':
      let date = new Date();
      res.writeHead(200, {'Content-Type': 'text/plain' });
      res.write(date.toString());
      res.end();
      break;
    case 'greet':
      switch (req.method) {
        case 'GET':
          res.writeHead(200, {'Content-Type': 'text/plain' });
          res.write('Hello, ' + pathParts[1].toString());
          res.end();
          break;
        case 'POST':
          res.writeHead(200);
          var reqBody;
          req.on('data', (chunk) => {
            reqBody += chunk;
          });
          req.on('end', () => {
            res.writeHead(200, {'Content-Type': 'text/plain' });
            var p = JSON.parse(reqBody.split('undefined')[1]);
            if (p.name) {res.write('Hello, ' + p.name);}

            res.end();
          });
          break;
      }
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain' });
      res.write('I don\'t know what %s is', urlParams.pathname);
      break;
  }

});

server.listen(port, (err) => {
  console.log('Server started on port ' + port + '; Ctrl c to stop.');
  if (err) {console.log(err);}
});
