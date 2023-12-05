const Router = require('router');
const bookRouter = require('./book');
const router = new Router();
const routes = () => {
  router.use('/api/books', bookRouter);
  return router;
};

module.exports = routes;
