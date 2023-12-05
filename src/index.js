const http = require('http');
const bodyParser = require('body-parser');
const finalhandler = require('finalhandler');
const Router = require('router');
const routes = require('./routes');
require('dotenv').config();
const port = 5000;
const api = Router();
api.use(bodyParser.json());
require('./configs/connectDb');
const server = http.createServer(function onRequest(req, res) {
  api(req, res, finalhandler(req, res));
});
api.use(routes());

//Not existing endpoint
api.use('*', function (req, res) {
  res.end(
    JSON.stringify({
      status: 404,
      message: 'Route not found',
    }),
  );
});

//Handle error
api.use(function (err, req, res, next) {
  res.end(
    JSON.stringify({
      status: res.statusCode || 500,
      message: err.message,
    }),
  );
});

server
  .listen(port, function () {
    console.log(`Server listening on http://localhost:${port}`);
  })
  .on('error', function (err) {
    console.log(`Server error: ${err}`);
  });
