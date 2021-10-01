const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Book = require('./Book');
const User = require('./User');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const CartItemSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  item: { type: Book.schema },
  user: { type: User.schema },
},{
  timestamps: true,
});

const CartItem = mongoose.model('CartItem', CartItemSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
CartItem.prototype.toString = function() {
  return `${this.title} (${this.authorName})`;
};

module.exports = CartItem;
