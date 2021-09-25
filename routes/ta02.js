//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

let users = ['Matt', 'Annie', 'Ruby', 'Abby',];
const DEFAULT_NAME = "[NO NAME ENTERED]";
router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02 I wanna throw up!',
    path: '/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    users,
  });
});

router.post('/addUser', (req,res,next) => {
  users.push(req.body.user || DEFAULT_NAME);

  res.writeHead(302, { Location: '/ta02' }); // Redirect
  return res.end();
});

router.post('/deleteUser', (req,res,next) => {
  const submission = req.body.user || DEFAULT_NAME;
  users = users.filter(u => u !== submission);

  res.writeHead(302, { Location: '/ta02' }); // Redirect
  return res.end();
});

module.exports = router;
