
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.card__variant-btn[data-variant-id]');
  if (!btn) return;

  e.preventDefault();
  e.stopImmediatePropagation();

  var variantId = btn.dataset.variantId;
  var originalText = btn.textContent;

  // Visual feedback
  btn.textContent = '✓';
  btn.style.background = '#121212';
  btn.style.color = '#fff';

  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: variantId, quantity: 1 })
  })
  .then(function(res) { return res.json(); })
  .then(function() {
    // Reset button after 1.5s
    setTimeout(function() {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);

    // Open Dawn's cart drawer if it exists
    var cartDrawer = document.querySelector('cart-drawer');
    if (cartDrawer) {
      cartDrawer.open();
      // Refresh cart drawer contents
      fetch('/?section_id=cart-drawer')
        .then(function(r) { return r.text(); })
        .then(function(html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, 'text/html');
          var newDrawer = doc.querySelector('cart-drawer');
         if (newDrawer) {
  cartDrawer.innerHTML = newDrawer.innerHTML;
  cartDrawer.open();
  // Reattach overlay click listener since innerHTML replacement destroys it
  var overlay = cartDrawer.querySelector('#CartDrawer-Overlay');
  if (overlay) {
    overlay.addEventListener('click', function() {
      cartDrawer.close();
    });
  }
}
        });
    } else {
      // Fallback — update cart count in header
      fetch('/cart.js')
        .then(function(r) { return r.json(); })
        .then(function(cart) {
          var bubble = document.querySelector('#cart-icon-bubble');
          if (bubble) {
            var count = bubble.querySelector('.cart-count-bubble');
            if (count) count.querySelector('span[aria-hidden]').textContent = cart.item_count;
          }
        });
    }
  })
  .catch(function() {
    // On error, fall back to product page
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
  });
}, true);


