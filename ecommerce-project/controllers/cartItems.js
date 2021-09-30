const CartItem = require('../models/CartItem');
const Book = require('../models/Book');
const { agregateCartBooks } = require('../utils/cart');
const { logAndSendError } = require('../utils/response');

const CartItemsController = {
  index: (req, res, next) => {
    // Note: Cart Items have been preloaded for nav counter.
    Promise.all(req.cartItems.map(ci => Book.find(ci.itemId))).then(books => {
      const cartBooksAgregate = agregateCartBooks(books);
      const grandTotal = cartBooksAgregate.reduce((total, ag) => +(total + ag.total).toFixed(2), 0);
      res.render('cartItems/index', {
        cartItems: req.cartItems,
        cartBooksAgregate,
        grandTotal,
      });
    });
  },
  create: (req, res, next) => {
    CartItem.create(req.body)
      .then(ci => res.send(ci))
      .catch(logAndSendError(res));
  },
};

module.exports = CartItemsController;
