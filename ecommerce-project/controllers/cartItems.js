const CartItem = require('../models/CartItem');

const CartItemsController = {
  index: (req, res, next) => {
    return CartItem.all()
      .then(items => res.send(items))
      .catch(err => console.error(err) || res.sendStatus(500));
  },
};

module.exports = CartItemsController;
