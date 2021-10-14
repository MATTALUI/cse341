const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { compose } = require("compose-middleware");

const CartItem = require('./models/CartItem');
const User = require('./models/User');
const Book = require('./models/Book');
const Order = require('./models/Order');

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

    CartItem.find({ 'user._id': req.user.id }).then(items => {
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

  checkBookBelongsToUser: (req, res, next) => {
    Book.findById(req.params.bookId || req.params.id).then(book => {
      if (!book || !req.user || book.createdBy._id !== req.user.id) {
        return res.redirect('/');
      }
      next();
    });
  },

  validateBookPayload: compose([
    body('title').notEmpty().trim(),
    body('price').notEmpty().isFloat({ min: 0 }),
    body('authorName').trim(), // Even though this is "required", it has UI defaults; we only need to sanitize
    body('summary').trim(), // Optional; only need to sanitize
    (req, res, next) => {
      const { errors } = validationResult(req);
      if (errors.length) {
        const newUrl = req.params.bookId ? `/books/${req.params.bookId}/edit` : '/books/new';
        const actionWord = req.params.bookId ? 'update' : 'create';

        req.flash('danger', `Unable to ${actionWord} the book. Please ensure all fields are filled out and try again.`);

        return res.redirect(newUrl);
      }

      next();
    },
  ]),

  checkOrderBelongsToUser: (req, res, next) => {
    Order.findById(req.params.orderId || req.params.id).then(order => {
      if (!order || !req.user || order.user._id !== req.user.id) {
        return res.redirect('/orders');
      }

      next();
    });
  },

  validateOrderPayload: compose([
    body('cardNumber').notEmpty().trim(), // This is actually hard coded in the form cause I don't want your card number...
    body('address').trim().notEmpty(),
    body('notes').trim(),
    (req, res, next) => {
      const { errors } = validationResult(req);
      if (errors.length) {

        req.flash('danger', `Unable to place your order. Please ensure all fields are filled out and try again.`);

        return res.redirect('/cart-items');
      }

      next();
    },
  ]),

  validateSignupPayload: compose([
    body('email').notEmpty().trim().isEmail(),
    body('password').notEmpty().isLength({ min: 8 }),
    body('confirmPassword').notEmpty().isLength({ min: 8 }).custom((confirmPassword, { req }) => {
      if(confirmPassword !== req.body.password){
        throw new Error('Passwords do not match.');
      }

      return true;
    }),
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
    (req, res, next) => {
      const { errors } = validationResult(req);
      if (errors.length) {
        req.flash('danger', `Unable to sign up. Please ensure all fields are filled out and try again.`);

        return res.redirect('/auth/signup');
      }

      next();
    },
  ]),
};
