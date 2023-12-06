const { Schema, model } = require('mongoose');
const mongoose_delete = require('mongoose-delete');
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
bookSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Book = model('Book', bookSchema);
module.exports = Book;
