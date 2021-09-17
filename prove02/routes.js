const express = require('express');
const fs = require('fs');
const { Book } = require('./models');
const router = express.Router();

let books = [
  // new Book({ title: "Cats from the Moon", authorName: "Matthew Hummer", summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),
  // new Book({ title: "Dr. Octopus Goes to the Zoo", authorName: "Matthew Hummer", summary: "The classic tale of an old octopus's trip to the zoo and the friends that he makes along the way."}),
];

/////////////////////////////////
// UI ROUTES
////////////////////////////////
router.get('/', (req, res, next) => {
  // REQ: Return a greeting message on the "/" route
  // REQ: On the "/" page, add a <form>...
  return res.render('index', { books });
});

router.get('/books/new', (req, res, next) => {
  const book = new Book();

  return res.render('form', { book });
});

router.get('/books/:bookId', (req, res, next) => {});

router.get('/books/:bookId/edit', (req, res, next) => {
  const book = books.find(book => book.id === req.params.bookId);

  return res.render('form', { book });
});

/////////////////////////////////
// API ROUTES
////////////////////////////////
router.post('/books', (req, res, next) => {
  // TODO: add some extra validation here
  books.push(new Book(req.body));

  res.writeHead(302, { Location: '/' }); // Redirect
  return res.end();
});

router.post('/books/:bookId', (req, res, next) => {
  // TODO: add some extra validation here
  const index = books.findIndex(book => book.id === req.params.bookId);
  books[index] = {
    id: req.params.bookId,
    ...req.body,
  };

  res.writeHead(302, { Location: '/' }); // Redirect
  return res.end();
});

router.delete('/books/:bookId', (req, res, next) => {
  // TODO: add some extra validation here
  books = books.filter(book => book.id !== req.params.bookId);

  // This route gets hit with AJAX, so a status is enough. No Need to redirect.
  return res.sendStatus(204); // No Content
});

module.exports = router;
