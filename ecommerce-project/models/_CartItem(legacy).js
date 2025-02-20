///////////////////////////////////////////////////////////////////////////////
// THESE ARE THE LEGACY MODEL THAT USE JSON-FILE BASED STORAGE. THEY SHOULD  //
// LONGER BE USED. INSTEAD, USE THE MONGO-BASED MODELS IN ./CartItem.js      //
///////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { handleParsablePromises }  = require('../utils/promises');
const CART_ITEM_DB = path.join(__dirname, '..', 'db/cartItems.json');


///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
function CartItem({
  id,
  itemId,
  dateAdded,
}={}) {
  this.id = id || uuidv4();
  this.itemId = itemId;
  this.dateAdded = dateAdded || Date().toString();
}


///////////////////////////////////////////////////////////////////////////////
// Class Methods                                                             //
///////////////////////////////////////////////////////////////////////////////
CartItem.all = function() {
  return new Promise((resolve, reject) =>
    fs.readFile(CART_ITEM_DB, 'utf8' , handleParsablePromises(resolve, reject))
  ).then(items => items.map(itemData => new CartItem(itemData)));
};

CartItem.find = function(itemId) {
  return CartItem.all().then(items => items.find(item => item.id === itemId));
};

CartItem.create = function(itemData) {
  return new Promise((resolve, reject) => {
    // TODO: add some extra validation here
    const item = new CartItem(itemData);
    // TODO: Double-check timestamp management
    CartItem.all().then(items => {
      items.push(item);
      fs.writeFile(CART_ITEM_DB, JSON.stringify(items), err =>
        err ? reject(error) : resolve(item)
      );
    });
  });
};

CartItem.update = function(itemData) {
  return new Promise((resolve, reject) => {
    // TODO: add some extra validation here
    const item = new CartItem(itemData);
    // TODO: manage timestamps here...
    CartItem.all().then(items => {
      const index = items.findIndex(b => b.id === item.id);
      items[index] = item;
      fs.writeFile(CART_ITEM_DB, JSON.stringify(items), err =>
        err ? reject(error) : resolve(item)
      );
    });
  });
};

CartItem.destroy = function(itemId) {
  return new Promise((resolve, reject) => {
    // TODO: add some extra validation here
    CartItem.all().then(items => {
      const index = items.findIndex(b => b.id === itemId);
      const item = items[index];
      items.splice(index, 1);
      fs.writeFile(CART_ITEM_DB, JSON.stringify(items), err =>
        err ? reject(error) : resolve(item)
      );
    });
  });
};

CartItem.destroyAllForBook = function(bookId) {
  return new Promise((resolve, reject) => {
    // TODO: add some extra validation here
    CartItem.all().then(items => {
      const removed = [];
      const keptItems = items.filter(b => {
        const keep = b.itemId !== bookId;
        if (!keep) {
          removed.push(b);
        }

        return keep;
      });
      fs.writeFile(CART_ITEM_DB, JSON.stringify(keptItems), err =>
        err ? reject(error) : resolve(removed)
      );
    });
  });
};


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
CartItem.prototype.toString = function() {
  return `${this.title} (${this.authorName})`;
};

module.exports = CartItem;
