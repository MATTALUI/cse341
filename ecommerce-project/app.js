const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const booksRouter = require('./routers/books');
const cartItemsRouter = require('./routers/cartItems');
const CustomMiddleware = require('./middleware');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL|| "mongodb://localhost:27017/myapp";

console.log(process.env);
console.log(MONGO_URL);
const corsOptions = {
  origin: "https://mhummer-cse341-bookstore.herokuapp.com/",
  optionsSuccessStatus: 200
};

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/views'))
  .use(cors(corsOptions))
  .use(express.static(path.join(__dirname, '/static')))
  .use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
  .use(bodyParser.json()) // parse application/json
  .use(CustomMiddleware.setUser)
  .use(CustomMiddleware.regsiterUsersCartItems)
  .use('/books', booksRouter)
  .use('/cart-items', cartItemsRouter)
  .get('/', (req,res,next) => res.redirect('/books')) // At least for now, we only sell books...
  .get('*',  (req,res,next) => res.sendStatus(404)) // Not found. :(
  .listen(PORT, '0.0.0.0', () => {
    console.log(`listening on 0.0.0.0:${PORT}`);
  });
