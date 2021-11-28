const http = require('http');

const router = require('./routes/person.routes');

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

module.exports = server;
