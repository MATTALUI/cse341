const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const CartItem = require('./CartItem');
const User = require('./User');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const StatusCodes = {
  PENDING: 10,
  CANCELLED: 20,
  DELIVERY: 50,
  FULFILLED: 100,
};
const OrderSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  items: [CartItem.schema],
  user: { type: User.schema },
  cardNumber: { type: String, default: '', },
  address: { type: String, default: '', },
  notes: { type: String, default: '', },
  status: { type: Number, default: StatusCodes.PENDING, },
},{
  timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema);
Order.StatusCodes = StatusCodes;


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Order.prototype.toString = function() {
  return `${this.title} (${this.authorName})`;
};

Order.prototype.statusDescription = function() {
  return {
    [StatusCodes.PENDING]: 'Pending',
    [StatusCodes.CANCELLED]: 'Canceled',
    [StatusCodes.DELIVERY]: 'Out For Delivery',
    [StatusCodes.FULFILLED]: 'Fulfilled',
  }[this.status] || 'Status Unknown';
};

module.exports = Order;
