const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const booksRouter = require('./routers/books');
const ordersRouter = require('./routers/orders');
const cartItemsRouter = require('./routers/cartItems');
const authRouter = require('./routers/auth');
const CustomMiddleware = require('./middleware');
const registerLocals = require('./utils/views');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL|| "mongodb://localhost:27017/ecommerce-bookshelf";
const DB_CONFIG = {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // family: 4
};
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
  .use(cookieParser())
  .use(CustomMiddleware.setUser)
  .use(CustomMiddleware.regsiterUsersCartItems)
  .use('/books', booksRouter)
  .use('/cart-items', cartItemsRouter)
  .use('/auth', authRouter)
  .use('/orders', ordersRouter)
  .get('/', (req,res,next) => res.redirect('/books')) // At least for now, we only sell books...
  .get('*',  (req,res,next) => res.sendStatus(404)); // Not found. :(
registerLocals(app);

mongoose.connect(MONGO_URL, DB_CONFIG)
  .then(() => app.listen(PORT, '0.0.0.0', () => {
    console.log(`listening on 0.0.0.0:${PORT}`);
  }))
  .catch(console.error);
