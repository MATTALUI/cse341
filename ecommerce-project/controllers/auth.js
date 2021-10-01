const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logAndSendError } = require('../utils/response');
const JWT_ALGO = 'HS256';
const JWT_SECRET = process.env.JWT_SECRET;

const AuthController = {
  login: (req, res, next) => {
    res.render('auth/login', {
      currentUser: req.user,
    });
  },
  signup: (req, res, next) => {
    res.render('auth/signup', {
      currentUser: req.user,
    });
  },
  logout: (req, res, next) => {
    res.clearCookie('user');
    res.redirect('/');
  },
  authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.redirect('/auth/login');
      }
      bcrypt.compare(req.body.password, user.passwordHash, function(err, result) {
        if (err || !result) {
          return res.redirect('/auth/login');
        }
        jwt.sign(user.minfo(), JWT_SECRET, { algorithm: JWT_ALGO }, (err, token) => {
          res.cookie('user', token);
          res.redirect('/');
        });
      });
    }).catch(logAndSendError(res));
  },
};

module.exports = AuthController;
