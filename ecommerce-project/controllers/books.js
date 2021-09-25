const fs = require('fs');
const Book = require('../models/Book');

const BooksController = {
  index: (req, res, next) => {
    return Book.all()
      .then(books => res.render('books/index', { books }))
      .catch(err => console.error(err) || res.sendStatus(500));
  },
  new: (req, res, next) => {
    const book = new Book();

    return res.render('books/form', { book });
  },
  show: (req, res, next) => {},
  edit: (req, res, next) => {
    return Book.find(req.params.bookId)
      .then(book => res.render('books/form', { book }))
      .catch(err => console.error(err) || res.sendStatus(500));
  },
  create: (req, res, next) => {
    return Book.create(req.body)
      .then(book => res.redirect('/'))
      .catch(err => console.error(err) || res.sendStatus(500));
  },
  update: (req, res, next) => {
    return Book.update({ id: req.params.bookId, ...req.body, })
      .then(book => res.redirect('/'))
      .catch(err => console.error(err) || res.sendStatus(500));
  },
  destroy: (req, res, next) => {
    // NOTE: This route is hit by AJAX, so we're okay just sending the status
    return Book.destroy(req.params.bookId)
      .then(book => res.sendStatus(204)) // No Content
      .catch(err => console.error(err) || res.sendStatus(500));
  },
};

module.exports = BooksController;
