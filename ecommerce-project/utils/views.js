const { agregateCartBooks } = require('./cart');

const collapseOrderBooks = order => agregateCartBooks(order.items.map(i => i.item));
const calcOrderTotal = order => order.items.reduce((total, i) => total + i.item.price, 0).toFixed(2);

const registerLocals = app => {
  app.locals.collapseOrderBooks = collapseOrderBooks;
  app.locals.calcOrderTotal = calcOrderTotal;
};

module.exports = registerLocals;
