/* =========================================
   VOGUE FRAMES — cart.js
   Unified shopping cart manager with localStorage persistence,
   multi-product support, dynamic drawer rendering & toast notifications.
   ========================================= */

'use strict';

window.VFCart = (function () {
  const STORAGE_KEY = 'vf_cart';

  // Retrieve current cart from localStorage
  function getCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn('Could not read cart from localStorage', err);
      return [];
    }
  }

  // Persist cart to localStorage & trigger UI updates
  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('Could not save cart to localStorage', err);
    }
    updateBadge();
    renderDrawer();
    // Dispatch event so other scripts (like checkout.js) can react live
    window.dispatchEvent(new CustomEvent('vf-cart-updated', { detail: { cart } }));
  }

  // Add a product or increment its quantity
  function addItem(product, qty = 1) {
    if (!product || !product.id) return;
    const cart = getCart();
    const existing = cart.find(i => i.id === product.id);

    if (existing) {
      existing.qty = (existing.qty || 1) + qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: product.image || (product.images && product.images[0]) || '',
        category: product.category || '',
        customizable: !!product.customizable,
        qty: qty
      });
    }

    saveCart(cart);
    showToast(`${product.name} added to cart!`);
    bumpBadge();
  }

  // Update item quantity (removes if qty <= 0)
  function updateQty(productId, newQty) {
    let cart = getCart();
    if (newQty <= 0) {
      const removed = cart.find(i => i.id === productId);
      cart = cart.filter(i => i.id !== productId);
      saveCart(cart);
      if (removed) showToast(`${removed.name} removed from cart`);
    } else {
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.qty = Math.min(newQty, 50);
        saveCart(cart);
      }
    }
  }

  // Remove item by product ID
  function removeItem(productId) {
    let cart = getCart();
    const removed = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    saveCart(cart);
    if (removed) {
      showToast(`${removed.name} removed from cart`);
    }
  }

  // Empty the cart completely
  function clearCart() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {}
    updateBadge();
    renderDrawer();
    window.dispatchEvent(new CustomEvent('vf-cart-updated', { detail: { cart: [] } }));
  }

  // Calculate total number of items
  function getCount() {
    return getCart().reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
  }

  // Calculate subtotal in INR
  function getTotal() {
    return getCart().reduce((sum, item) => sum + (Number(item.price) * (Number(item.qty) || 1)), 0);
  }

  // Update all cart badge counts in the DOM
  function updateBadge() {
    const count = getCount();
    document.querySelectorAll('.cart-badge, #cart-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // Subtle bounce animation on badge
  function bumpBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    badge.classList.remove('bump');
    void badge.offsetHeight;
    badge.classList.add('bump');
  }

  // Open or close the side cart drawer
  function toggleDrawer(forceState) {
    const drawer  = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer || !overlay) return;

    const shouldOpen = typeof forceState === 'boolean'
      ? forceState
      : !drawer.classList.contains('open');

    drawer.classList.toggle('open', shouldOpen);
    overlay.classList.toggle('open', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';

    if (shouldOpen) {
      renderDrawer();
    }
  }

  // Render items in the slide-out drawer
  function renderDrawer() {
    const itemsEl  = document.getElementById('cartItems');
    const emptyEl  = document.getElementById('cartEmpty');
    const footerEl = document.getElementById('cartFooter');
    const totalEl  = document.getElementById('cartTotal');
    const chkBtn   = document.getElementById('checkout-btn');
    if (!itemsEl) return;

    const cart = getCart();
    const total = getTotal();
    const count = getCount();

    if (totalEl) {
      totalEl.textContent = '₹' + total.toLocaleString('en-IN');
    }

    if (chkBtn) {
      chkBtn.setAttribute('href', 'checkout.html');
      chkBtn.onclick = null; // Do not intercept with toggleCart() anchor jump
    }

    if (cart.length === 0) {
      if (emptyEl) emptyEl.style.display = 'flex';
      if (footerEl) footerEl.style.display = 'none';
      itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (footerEl) footerEl.style.display = 'flex';

    // Remove existing item rows
    itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());

    // Render each item with thumbnail, details, quantity controls, and delete button
    cart.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.setAttribute('data-id', item.id);
      el.innerHTML = `
        <div class="cart-item-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-top">
            <h4 class="cart-item-name" title="${item.name}">${item.name}</h4>
            <button type="button" class="cart-item-remove" onclick="VFCart.remove('${item.id}')" aria-label="Remove ${item.name}" title="Remove item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="cart-item-unit-price">&#8377;${item.price.toLocaleString('en-IN')} each</div>
          <div class="cart-item-bottom">
            <div class="cart-qty-ctrl">
              <button type="button" class="cart-qty-btn" onclick="VFCart.updateQty('${item.id}', ${item.qty - 1})" aria-label="Decrease quantity">−</button>
              <span class="cart-qty-num">${item.qty}</span>
              <button type="button" class="cart-qty-btn" onclick="VFCart.updateQty('${item.id}', ${item.qty + 1})" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-item-subtotal">&#8377;${(item.price * item.qty).toLocaleString('en-IN')}</span>
          </div>
        </div>
      `;
      itemsEl.appendChild(el);
    });
  }

  // Toast feedback message
  function showToast(msg) {
    const toast   = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window._vfToastTimer);
    window._vfToastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Backwards compatibility wrappers
  window.toggleCart = toggleDrawer;
  window.renderCart = renderDrawer;
  window.addToCart = function (nameOrProduct, price) {
    if (typeof nameOrProduct === 'object' && nameOrProduct !== null) {
      addItem(nameOrProduct, 1);
    } else {
      // Find in PRODUCTS_DATA if loaded
      let prod = null;
      if (typeof PRODUCTS_DATA !== 'undefined') {
        prod = Object.values(PRODUCTS_DATA).find(p => p.name === nameOrProduct);
      }
      if (!prod) {
        prod = {
          id: (nameOrProduct || 'custom-item').toLowerCase().replace(/\s+/g, '-'),
          name: nameOrProduct,
          price: price || 0,
          image: '',
          category: 'Custom',
          customizable: true
        };
      }
      addItem(prod, 1);
    }
  };
  window.removeFromCart = removeItem;

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateBadge();
      renderDrawer();
    });
  } else {
    updateBadge();
    renderDrawer();
  }

  return {
    get: getCart,
    save: saveCart,
    add: addItem,
    updateQty: updateQty,
    remove: removeItem,
    clear: clearCart,
    getCount: getCount,
    getTotal: getTotal,
    updateBadge: updateBadge,
    renderDrawer: renderDrawer,
    toggleDrawer: toggleDrawer,
    showToast: showToast
  };
})();

var VFCart = window.VFCart;
var renderCart = window.renderCart;
var toggleCart = window.toggleCart;
var addToCart = window.addToCart;
var removeFromCart = window.removeFromCart;
