const Book = require('../models/Book');
const CartItem = require('../models/CartItem');
const { logAndSendError } = require('../utils/response');

const BooksController = {
  index: (req, res, next) => {
    return Book.all()
      .then(books => res.render('books/index', { books, cartItems: req.cartItems }))
      .catch(logAndSendError(res));
  },
  new: (req, res, next) => {
    const book = new Book();

    return res.render('books/form', { book, cartItems: req.cartItems });
  },
  show: (req, res, next) => {},
  edit: (req, res, next) => {
    return Book.find(req.params.bookId)
      .then(book => res.render('books/form', { book, cartItems: req.cartItems }))
      .catch(logAndSendError(res));
  },
  create: (req, res, next) => {
    return Book.create(req.body)
      .then(book => res.redirect('/'))
      .catch(logAndSendError(res));
  },
  update: (req, res, next) => {
    return Book.update({ id: req.params.bookId, ...req.body, })
      .then(book => res.redirect('/'))
      .catch(logAndSendError(res));
  },
  destroy: (req, res, next) => {
    return Book.destroy(req.params.bookId)
      .then(book => CartItem.destroyAllForBook(book.id)
        .then(removed => res.send({ book, removed }))
        .catch(logAndSendError(res))
      )
      .catch(logAndSendError(res));
  },
};

module.exports = BooksController;
