const http = require('http');

const router = require('./utils/Router');

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

module.exports = server;
