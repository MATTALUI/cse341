const express = require('express');
const bodyParser = require('body-parser');
const booksRouter = require('./routers/books');
const cartItemsRouter = require('./routers/cartItems');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/views'))
  .use(express.static(path.join(__dirname, '/static')))
  .use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
  .use(bodyParser.json()) // parse application/json
  .use('/books', booksRouter)
  .use('/cart-items', cartItemsRouter)
  .get('/', (req,res,next) => res.redirect('/books')) // At least for now, we only sell books...
  .get('*',  (req,res,next) => res.sendStatus(404)) // Not found. :(
  .listen(port, '0.0.0.0', () => {
    console.log(`listening on 0.0.0.0:${port}`);
  });
