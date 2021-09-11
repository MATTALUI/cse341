const express = require('express');
const bodyParser = require('body-parser');
const prove01Router = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
  .use(bodyParser.json()) // parse application/json
  .use('/', prove01Router)
  .listen(port, '0.0.0.0', () => {
    console.log(`listening on 0.0.0.0:${port}`);
  });
