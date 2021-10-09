const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const color = req.cookies.color || '#0065BD';
  const count = req.cookies.count || 0;
  res.render('pages/ta05', {
    title: 'Team Activity 05',
    path: '/ta05', // For pug, EJS
    contentCSS: true, // For HBS
    color,
    count,
  });
});

router.post('/setColor', (req, res, next) => {
  res.cookie('color', req.body.color);

  res.redirect('/ta05');
});

router.get('/increment', (req, res,next) => {
  const count = +req.cookies.count || 0;
  res.cookie('count', count + 1);

  res.redirect('/ta05');
});

router.get('/decrement', (req, res,next) => {
  const count = +req.cookies.count || 0;
  res.cookie('count', count - 1);

  res.redirect('/ta05');
});

router.get('/reset', (req, res, next) => {
  res.clearCookie('color');
  res.clearCookie('count');

  res.redirect('/ta05');
});

module.exports = router;
