const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { handleParsablePromises }  = require('../utils/promises');
const BOOK_DB = path.join(__dirname, '..', 'db/books.json');


///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
function Book({
  id,
  title,
  authorName,
  summary,
  image,
  createdAt,
  updatedAt,
  price,
}={}) {
  this.id = id || uuidv4();
  this.title = title;
  this.authorName = authorName;
  this.summary = summary;
  this.image = image;
  this.price = price || 0;
  this.createdAt = createdAt || Date().toString();
  this.updatedAt = updatedAt || Date().toString();
}


///////////////////////////////////////////////////////////////////////////////
// Class Methods                                                             //
///////////////////////////////////////////////////////////////////////////////
Book.all = function() {
  return new Promise((resolve, reject) =>
    fs.readFile(BOOK_DB, 'utf8' , handleParsablePromises(resolve, reject))
  ).then(books => books.map(bookData => new Book(bookData)));
};

Book.find = function(bookId) {
  return Book.all().then(books => books.find(book => book.id === bookId));
};

Book.create = function(bookData) {
  return new Promise((resolve, reject) => {
    // TODO: add some extra validation here
    const book = new Book(bookData);
    // TODO: Double-check timestamp management
    Book.all().then(books => {
      books.push(book);
      fs.writeFile(BOOK_DB, JSON.stringify(books), err =>
        err ? reject(error) : resolve(book)
      );
    });
  });
};

Book.update = function(bookData) {
  return new Promise((resolve, reject) => {
    // TODO: add some extra validation here
    const book = new Book(bookData);
    // TODO: manage timestamps here...
    Book.all().then(books => {
      const index = books.findIndex(b => b.id === book.id);
      books[index] = book;
      fs.writeFile(BOOK_DB, JSON.stringify(books), err =>
        err ? reject(error) : resolve(book)
      );
    });
  });
};

Book.destroy = function(bookId) {
  return new Promise((resolve, reject) => {
    // TODO: add some extra validation here
    Book.all().then(books => {
      const index = books.findIndex(b => b.id === bookId);
      const book = books[index];
      books.splice(index, 1);
      fs.writeFile(BOOK_DB, JSON.stringify(books), err =>
        err ? reject(error) : resolve(book)
      );
    });
  });
};


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Book.prototype.toString = function() {
  return `${this.title} (${this.authorName})`;
};

module.exports = Book;
