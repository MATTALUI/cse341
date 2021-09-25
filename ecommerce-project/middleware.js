const CartItem = require('./models/CartItem');

module.exports = {
  setUser: (req, res, next) => {
    // TODO: Actually manage a user here?
    req.user = {};
    next();
  },

  regsiterUsersCartItems: (req, res, next) => {
    CartItem.all().then(items => {
      req.cartItems = items;
      next();
    });
  },
};
