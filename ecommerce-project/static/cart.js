(() => {
  const deltaCartItems = delta => {
    const $cartCount = $('#cart-count');
    let count = +$cartCount.html().match(/\d{1,}/)[0];
    count += delta;
    $('#cart-count').html(`(${count})`);
  };

  const removeFromCart = event => {
    const itemId = $(event.target).closest('.cart-item').data('book');
    const headline = $(event.target).closest('.cart-item').data('headline');
    const count = +$(event.target).closest('.cart-item').data('count');

    // TODO: do this check in a modal or something less annoyting...
    if (!confirm(`Are you sure you want to remove ${headline} from the cart?`)) {
      return;
    }
    // new Promise((res, rej) => res())
    $.ajax(`/cart-items/${itemId}`, { method: 'DELETE', headers: { 'CSRF-Token': getCSRFToken() } }).then(() => {
      $(event.target).closest('.cart-item').remove();
      deltaCartItems(-count);
      makeToast(`<em class="fw-bold">${headline}</em> was successfully removed from your cart.`, {
        delay: 6000,
        color: 'success',
      });
      validateOrderForm();

      let cartCount = +$('#cart-count').html().match(/\d{1,}/)[0];

      if (cartCount === 0) {
        $('table').remove();
        $('#cart-card').append(`
          <div class="alert alert-primary mt-3" role="alert">
            <span>You have no books in your cart!</span>
          </div>
        `);
      }
    }).catch(console.error);
  };

  const validateOrderForm = event => {
    const cartCount = $('.cart-item').length;
    $('#order-submit').attr('disabled', !cartCount);
  };

  $('.remove-item').on('click', removeFromCart);
  $('form').on('change', validateOrderForm);
  $(document).ready(validateOrderForm);
})();

(() => {
  let readyToValidate = false;

  const validate = () => {
    let isValid = true;

    // Clear all errors; start with a blank slate
    $('input').each((index, ele) => {
      const $ele = $(ele);
      $ele.siblings('.invalid-feedback').remove();
      $ele.removeClass('is-invalid');
    });

    // Make Sure That All Required Fields Are Filled In
    $('input[required]').each((index, ele) => {
      const $ele = $(ele);
      if ($ele.val().length < 1) {
        $ele.addClass('is-invalid');
        $('<span class="invalid-feedback">Please Provide this information.</span>').insertAfter($ele);
        isValid = false;
      } else {
        $ele.removeClass('is-invalid');
      }
    });

    return isValid;
  };

  $('form').on('change', event => {
    if (readyToValidate) {
      validate();
    }
  });

  $('form > button').on('click', event => {
    console.log('click');
    readyToValidate = true;
    if (!validate()) {
      // This gets triggered before the submit event, so we can add an extra
      // layer of pretty validation before it even hits the HTML5 browser
      // validation.
      event.preventDefault();
    }
  });
})();
