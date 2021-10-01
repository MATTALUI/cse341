const Book = require('../models/Book');
const CartItem = require('../models/CartItem');
const { logAndSendError } = require('../utils/response');

const BooksController = {
  index: (req, res, next) => {
    return Book.find()
      .then(books => res.render('books/index', {
        books,
        currentUser: req.user,
        cartItems: req.cartItems
      }))
      .catch(logAndSendError(res));
  },
  new: (req, res, next) => {
    const book = new Book();

    return res.render('books/form', {
      book,
      currentUser: req.user,
      cartItems: req.cartItems
    });
  },
  show: (req, res, next) => {},
  edit: (req, res, next) => {
    return Book.findById(req.params.bookId)
      .then(book => res.render('books/form', {
        book,
        currentUser: req.user,
        cartItems: req.cartItems
      }))
      .catch(logAndSendError(res));
  },
  create: (req, res, next) => {
    return Book.create({ ...req.body, createdBy: req.user })
      .then(book => res.redirect('/'))
      .catch(logAndSendError(res));
  },
  update: (req, res, next) => {
    return Book.findById(req.params.bookId).update(req.body)
      .then(book => res.redirect('/'))
      .catch(logAndSendError(res));
  },
  destroy: (req, res, next) => {
    return Book.findOneAndDelete(req.params.bookId)
      .then(book => CartItem.deleteMany({ 'item.id': book.id })
        .then(removed => res.send({ book, removed }))
        .catch(logAndSendError(res))
      )
      .catch(logAndSendError(res));
  },
};

module.exports = BooksController;

// ddfcf252-a921-459c-b9c2-30287d59df19
