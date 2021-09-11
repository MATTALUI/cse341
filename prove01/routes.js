const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

const dummyUsers = [{
  id: 1,
  username: "MATTALUI",
}];

router.get('/', (req, res, next) => {
  // REQ: Return a greeting message on the "/" route
  // REQ: On the "/" page, add a <form>...
  res.sendFile(path.join(__dirname, './views/form.html'));
});

router.get('/users', (req, res, next) => {
  // REQ: Return a list of dummy users on the "/users" route
  res.send(dummyUsers);
});

router.post('/create-user', (req, res, next) => {
  const id = dummyUsers[dummyUsers.length - 1].id + 1;
  dummyUsers.push({
    id,
    username: req.body.username,
  });
  res.sendFile(path.join(__dirname, './views/thanks.html'));
});

module.exports = router;
