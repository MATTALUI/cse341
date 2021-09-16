//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

const users = ['Matt', 'Annie', 'Ruby'];
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
  users.push(req.body.user || "[NO NAME ENTERED]");

  res.writeHead(302, { Location: '/ta02' }); // Redirect
  return res.end();
});

router.post('/deleteUser', (req,res,next) => {
  const user = req.body.user || "[NO NAME ENTERED]";
  const index = users.indexOf(user);
  users.splice(index, 1);

  res.writeHead(302, { Location: '/ta02' }); // Redirect
  return res.end();
});

module.exports = router;
