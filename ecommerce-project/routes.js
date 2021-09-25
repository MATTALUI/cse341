const express = require('express');
const fs = require('fs');
const Book = require('./models/Book');
const router = express.Router();

/////////////////////////////////
// UI ROUTES
////////////////////////////////
router.get('/', (req, res, next) => {
  return Book.all()
    .then(books => res.render('index', { books }))
    .catch(err => console.error(err) || res.sendStatus(500));
});

router.get('/books/new', (req, res, next) => {
  const book = new Book();

  return res.render('form', { book });
});

router.get('/books/:bookId', (req, res, next) => {});

router.get('/books/:bookId/edit', (req, res, next) => {
  return Book.find(req.params.bookId)
    .then(book => res.render('form', { book }))
    .catch(err => console.error(err) || res.sendStatus(500));
});

/////////////////////////////////
// API ROUTES
////////////////////////////////
router.post('/books', (req, res, next) => {
  return Book.create(req.body)
    .then(book => res.redirect('/'))
    .catch(err => console.error(err) || res.sendStatus(500));
});

router.post('/books/:bookId', (req, res, next) => {
  return Book.update({ id: req.params.bookId, ...req.body, })
    .then(book => res.redirect('/'))
    .catch(err => console.error(err) || res.sendStatus(500));
});

router.delete('/books/:bookId', (req, res, next) => {
  // NOTE: This route is hit by AJAX, so we're okay just sending the status
  return Book.destroy(req.params.bookId)
    .then(book => res.sendStatus(204)) // No Content
    .catch(err => console.error(err) || res.sendStatus(500));
});

module.exports = router;
