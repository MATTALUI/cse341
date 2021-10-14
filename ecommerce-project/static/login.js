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

    // Make Sure Email Matches Pattern
    const $emailInput = $('input[name="email"]');
    if ($emailInput.val() && !$emailInput.hasClass('.is-invalid')) {
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
      if (!$emailInput.val().match(emailRegex)) {
        $emailInput.addClass('is-invalid');
        $('<span class="invalid-feedback">Please Provide a valid email address.</span>').insertAfter($emailInput);
        isValid = isValid && false;
      }
    }

    return isValid;
  };

  $('form').on('change', event => {
    if (readyToValidate) {
      validate();
    }
  });

  $('input[type="submit"]').on('click', event => {
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
