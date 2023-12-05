const Router = require('router');
const Book = require('../models/Book.model');
const router = new Router();
const mongoose = require('mongoose');
router.get('/', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const books = await Book.find();
    res.statusCode = 200;
    return res.end(JSON.stringify(books));
  } catch (error) {
    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        message: error.message,
        status: 500,
      }),
    );
  }
});

router.post('/', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const book = new Book({ ...req.body });
    const savedBook = await book.save();
    res.statusCode = 201;
    return res.end(JSON.stringify(savedBook));
  } catch (error) {
    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        message: error.message,
        status: 500,
      }),
    );
  }
});

router.get('/:id', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        status: 400,
        message: 'Id invalid',
      }),
    );
  }
  try {
    const findBook = await Book.findById(id);
    if (!findBook) {
      res.statusCode = 404;
      return res.end(
        JSON.stringify({
          status: 404,
          message: 'Book not found',
        }),
      );
    }
    res.statusCode = 200;
    return res.end(JSON.stringify(findBook));
  } catch (error) {
    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        message: error.message,
        status: 500,
      }),
    );
  }
});

router.put('/:id', function (req, res) {
  const id = req.params.id;
  res.end(id);
});

router.delete('/:id', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        status: 400,
        message: 'Id invalid',
      }),
    );
  }
  try {
    const findBook = await Book.findById(id);
    if (!findBook) {
      res.statusCode = 404;
      return res.end(
        JSON.stringify({
          status: 404,
          message: 'Book  not found',
        }),
      );
    }
    if (findBook.isDeleted) {
      res.statusCode = 404;
      return res.end(
        JSON.stringify({
          status: 404,
          message: 'Book not found',
        }),
      );
    }
    const deleted = await Book.softDelete({ _id: id });
    if (!deleted.deleted) {
      res.statusCode = 400;
      return res.end(
        JSON.stringify({
          message: 'Deleted failed',
        }),
      );
    }
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        message: 'Deleted successfully',
      }),
    );
  } catch (error) {
    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        message: error.message,
        status: 500,
      }),
    );
  }
});

router.patch('/restore/:id', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        status: 400,
        message: 'Id invalid',
      }),
    );
  }
  try {
    const booksDeleted = await Book.findDeleted({ _id: id });
    const bookDeleted = booksDeleted?.find((i) => i._id.toString() === id);
    if (!bookDeleted) {
      res.statusCode = 404;
      return res.end(
        JSON.stringify({
          status: 404,
          message: 'Book not found',
        }),
      );
    }
    const restored = await Book.restore({ _id: id });
    if (!restored.restored) {
      res.statusCode = 400;
      return res.end(
        JSON.stringify({
          message: 'Restore failed',
        }),
      );
    }
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        message: 'Restore successfully',
      }),
    );
  } catch (error) {
    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        message: error.message,
        status: 500,
      }),
    );
  }
});
module.exports = router;
