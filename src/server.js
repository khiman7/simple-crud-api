const http = require('http');

const router = require('./routes/person.routes');

const server = http.createServer((req, res) => {
  try {
    router.handle(req, res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'message': '500 Internal Server Error' }));
  }
});

module.exports = server;
