const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const { logAndSendError } = require('../utils/response');

const OrdersController = {
  index: (req, res, next) => {
    Order.find({ 'user._id': req.user.id })
      .sort({createdAt: 'desc'})
      .then(orders => res.render('orders/index', {
        cartItems: req.cartItems,
        currentUser: req.user,
        orders,
      }))
      .catch(logAndSendError(res));
  },
  create: (req, res, next) => {
    Order.create({
        ...req.body,
        user: req.user,
        items: req.cartItems,
      }).then(order => {
        CartItem.deleteMany({ 'user._id': req.user.id })
          .then(items => res.redirect('/orders'))
          .catch(logAndSendError(res));
      })
      .catch(logAndSendError(res));
  },
  cancel: (req, res, next) => {
    return Order.findById(req.params.orderId)
      .update({status: Order.StatusCodes.CANCELLED })
      .then(book => res.redirect('/orders'))
      .catch(logAndSendError(res));
  },
};

module.exports = OrdersController;
