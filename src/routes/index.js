const Router = require("router");
const bookRouter = require("./book");
const router = new Router();
const routes = () => {
  router.use("/books", bookRouter);
  return router;
};

module.exports = routes;
