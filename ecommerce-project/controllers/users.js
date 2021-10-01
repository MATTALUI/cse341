const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/User');
const { logAndSendError } = require('../utils/response');
const SALT_ROUNDS = 10;
const JWT_ALGO = 'HS256';
const JWT_SECRET = process.env.JWT_SECRET;

const UsersController = {
  create: (req, res, next) => {
    // TODO: Beef up the validations here
    // TODO: make use of the confirm password
    bcrypt.hash(req.body.password, SALT_ROUNDS).then(hash => {
      delete req.body.password;
      req.body.passwordHash = hash;
      User.create(req.body).then(user => {
        jwt.sign(user.minfo(), JWT_SECRET, { algorithm: JWT_ALGO }, (err, token) => {
          res.cookie('user', token);
          res.redirect('/');
        });
      }).catch(logAndSendError(res));
    }).catch(logAndSendError(res));
  },
};

module.exports = UsersController;
