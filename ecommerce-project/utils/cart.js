module.exports = {
  agregateCartBooks: books => {
    const bookHash = {};

    books.forEach(book => {
      if (bookHash[book.id]) {
        bookHash[book.id].quantity++;
      } else {
        bookHash[book.id] = {
          book,
          quantity: 1,
        };
      }
      bookHash[book.id].total = `$${(bookHash[book.id].quantity * bookHash[book.id].book.price).toFixed(2)}`;
    });

    return Object.values(bookHash);
  },
};
