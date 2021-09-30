const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const BookSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  title: { type: String, default: '', },
  authorName: { type: String, default: '', },
  summary: { type: String, default: '', },
  image: { type: String, default: '', },
  price: { type: Number, default: 0, },
},{
  timestamps: true
});

const Book = mongoose.model('Book', BookSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Book.prototype.toString = function() {
  return `${this.title} (${this.authorName})`;
};

Book.prototype.priceString = function() {
  if (this.price > 0) {
    return `$${this.price.toFixed(2)}`;
  }

  return 'FREE';
};

module.exports = Book;
