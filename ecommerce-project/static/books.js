(() => {
  const deltaCartItems = delta => {
    const $cartCount = $('#cart-count');
    let count = +$cartCount.html().match(/\d{1,}/)[0];
    count += delta;
    $('#cart-count').html(`(${count})`);
  };

  const deleteBook = event => {
    // TODO: Use a modal or something less annoyting here...
    if (!confirm('This will remove this book from the list of available products. There is no going back. Are you sure?')) {
      return;
    }

    const bookId = $(event.target).closest('.book-item').data('id');
    $.ajax(`/books/${bookId}`, { method: 'DELETE' })
      .then(responseData => {
        const headline = $(event.target).closest('.book-item').data('headline');

        $(event.target).closest('.book-item').remove();
        deltaCartItems(-responseData.removed.deletedCount);
        makeToast(`<em class="fw-bold">${headline}</em> was successfully deleted.`, {
          delay: 6000,
          color: 'success',
        });
        if ($('.book-item').length === 0) {
          $('.list-group').append(`
            <div class="alert alert-primary" role="alert">
              <span>There are currently no books for sale. <a href="/new">Try adding a product</a>!</span>
            </div>
          `);
        }
      })
      .catch(console.error);
  };

  const addToCart = event => {
    const itemId = $(event.target).closest('.book-item').data('id');

    $.ajax('/cart-items', { method: 'POST', data: { itemId } })
      .then(cartItem => {
        const headline = $(event.target).closest('.book-item').data('headline');
        deltaCartItems(1);
        makeToast(`<em class="fw-bold">${headline}</em> was successfully added to your cart!`, {
          delay: 6000,
          color: 'success',
        });
      })
      .catch(console.error);
  };

  $('.delete-book').on('click', deleteBook);
  $('.add-to-cart').on('click', addToCart);
})();
