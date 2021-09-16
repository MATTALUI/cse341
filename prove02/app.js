const express = require('express');
const bodyParser = require('body-parser');
const prove02Router = require('./routes');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/views'))
  .use(express.static(path.join(__dirname, '/static')))
  .use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
  .use(bodyParser.json()) // parse application/json
  .use('/', prove02Router)
  .listen(port, '0.0.0.0', () => {
    console.log(`listening on 0.0.0.0:${port}`);
  });
