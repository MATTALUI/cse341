(() => {
  $('.delete-book').on('click', event => {
    // TODO: Use a modal or something less annoyting here...
    if (!confirm('This will remove this book from the list of available products. There is no going back. Are you sure?')) {
      return;
    }

    const bookId = $(event.target).data('id');
    $.ajax(`/books/${bookId}`, { method: 'DELETE' })
      .then(() => {
        $(event.target).closest('.book-item').remove();

        if ($('.book-item').length === 0) {
          $('.list-group').append(`
            <div class="alert alert-primary" role="alert">
              <span>There are currently no books for sale. <a href="/new">Try adding a product</a>!</span>
            </div>
          `);
        }
      })
      .catch(console.error);
  });
})();
