const express = require('express');
const fs = require('fs');
const { User } = require('./models');
const router = express.Router();

const users = [new User({
  id: 1,
  username: "MATTALUI",
  email: 'matt@example.com',
  phone: '9705551234',
  firstName: 'Matt',
  lastName: 'Hummer',
})];

router.get('/', (req, res, next) => {
  // REQ: Return a greeting message on the "/" route
  // REQ: On the "/" page, add a <form>...
  res.render('form');
});

router.get('/users', (req, res, next) => {
  // REQ: Return a list of dummy users on the "/users" route
  res.render('users', { users });
});

router.post('/create-user', (req, res, next) => {
  // TODO: add some extra validation here
  const user = new User(req.body);
  users.push(user);
  res.render('thanks', { user });
});

module.exports = router;
