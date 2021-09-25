const CartItem = require('../models/CartItem');
const Book = require('../models/Book');
const { agregateCartBooks } = require('../utils/cart');

const CartItemsController = {
  index: (req, res, next) => {
    // Note: Cart Items have been preloaded for nav counter.
    Promise.all(req.cartItems.map(ci => Book.find(ci.itemId))).then(books => {
      const cartBooksAgregate = agregateCartBooks(books);
      res.render('cartItems/index', {
        cartItems: req.cartItems,
        cartBooksAgregate,
      });
    });
  },
};

module.exports = CartItemsController;
