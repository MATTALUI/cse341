const jwt = require('jsonwebtoken');
const CartItem = require('./models/CartItem');
const User = require('./models/User');

module.exports = {
  setUser: (req, res, next) => {
    jwt.verify(req.cookies.user, process.env.JWT_SECRET, (err, userData) => {
      if (err) {
        req.user = null;
        return next();
      }

      User.findById(userData.id).then(user => {
        req.user = user;
        next();
      });
    });

  },

  regsiterUsersCartItems: (req, res, next) => {
    if (!req.user) {
      req.cartItems = [];
      return next();
    }

    CartItem.find({ 'user.id': req.user.id }).then(items => {
      req.cartItems = items;
      next();
    });
  },

  preventUser: (req, res, next) => {
    if (req.user) {
      return res.redirect('/');
    }

    next();
  },

  enforceUser: (req, res, next) => {
    if (!req.user) {
      return res.redirect('/');
    }

    next();
  },
};
