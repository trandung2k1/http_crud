const Router = require("router");
const yj = require("yieldable-json");
const router = new Router();
router.get("/", function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const books = [
    {
      id: 1,
      name: "Vo nhat",
    },
  ];
  yj.stringifyAsync(books, function (err, rs) {
    if (err) {
      res.end(JSON.stringify(err));
    }
    res.end(rs);
  });
});
module.exports = router;
