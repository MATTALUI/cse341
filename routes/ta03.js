//TA03 PLACEHOLDER
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
  fs.readFile(path.join(__dirname, '..', 'db/ta03.json'), 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const search = req.query.search;
    const products = JSON.parse(data).filter(
      product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );

    return res.render('pages/ta03', {
      title: 'Team Activity 03',
      path: '/ta03', // For pug, EJS
      activeTA03: true, // For HBS
      contentCSS: true, // For HBS
      products,
      search
    });
  });
});

module.exports = router;
