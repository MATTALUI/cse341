const CartItem = require('../models/CartItem');
const Book = require('../models/Book');
const { agregateCartBooks } = require('../utils/cart');
const { logAndSendError } = require('../utils/response');

const CartItemsController = {
  index: (req, res, next) => {
    // Note: Cart Items have been preloaded for nav counter.
    const books = req.cartItems.map(ci => new Book(ci.item));
    const cartBooksAgregate = agregateCartBooks(books);
    const grandTotal = cartBooksAgregate.reduce((total, ag) => +(total + ag.total).toFixed(2), 0);
    res.render('cartItems/index', {
      cartItems: req.cartItems,
      currentUser: req.user,
      cartBooksAgregate,
      grandTotal,
    });
  },
  show: (req, res, next) => {
    // NOTE: This endpoint doesn't actually make sense from a practical standpoint,
    // given our implementation of the cart. However, it's wanted by the assignment
    // so here it is!
    return CartItem.findById(req.params.cartItemId)
      .then(cartItem => res.send(cartItem))
      .catch(logAndSendError(res));
  },
  create: (req, res, next) => {
    Book.findById(req.body.itemId)
      .then(book => CartItem.create({ item: book, user: req.user })
        .then(ci => res.send(ci))
        .catch(logAndSendError(res))
      )
      .catch(logAndSendError(res));
  },
  update: (req, res, next) => {
    // NOTE: This endpoint doesn't actually make sense from a practical standpoint,
    // given our implementation of the cart. However, it's wanted by the assignment
    // so here it is!
    return CartItem.findById(req.params.cartItemId).update(req.body)
      .then(update => res.send(update))
      .catch(logAndSendError(res));
  },
  destroy: (req, res, next) => {
    return CartItem.deleteMany({ 'item._id': req.params.itemId, 'user._id': req.user.id })
      .then(deleted => res.send(deleted))
      .catch(logAndSendError(res));
  },
};

module.exports = CartItemsController;
