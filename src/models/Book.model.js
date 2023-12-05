const { Schema, model } = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');
const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
bookSchema.plugin(softDeletePlugin);
const Book = model('Book', bookSchema);
module.exports = Book;
