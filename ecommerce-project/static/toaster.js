// This will now be available globally
function makeToast(message, config={}){
  const $toast = $(`
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header bg-${config.color || 'dark'} text-light">
        <strong class="me-auto">${config.title || 'My Bookshop'}</strong>
        <small>Just now</small>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        <p>${message}</p>
        <div>${config.body || ""}</div>
      </div>
    </div>
  `);
  $('#toaster').append($toast);

  $toast.toast({
    delay: 4000,
    ...config.config
  });

  $toast.toast('show');
}
