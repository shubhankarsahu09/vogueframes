/* =========================================
   VOGUE FRAMES — checkout.js
   Multi-Product Checkout & Order Submission Logic
   ========================================= */

'use strict';

// ---- URL Product Parameter Helper ----
function getProductFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('product') || params.get('id');
}

// ---- Render All Multi-Product Cart Items on Checkout ----
function renderCheckoutItems() {
  const listEl     = document.getElementById('summaryProductsList');
  const emptyEl    = document.getElementById('checkoutEmptyState');
  const subtotalEl = document.getElementById('sumSubtotal');
  const totalEl    = document.getElementById('sumTotal');
  const qtyLabelEl = document.getElementById('summaryQtyLabel');
  const btnTotalEl = document.getElementById('btnOrderTotal');
  const submitBtn  = document.getElementById('btnPlaceOrder');

  if (!listEl) return;

  const cart = window.VFCart ? window.VFCart.get() : [];
  const total = window.VFCart ? window.VFCart.getTotal() : 0;
  const count = window.VFCart ? window.VFCart.getCount() : 0;

  // Form total pill & summary fields
  const formattedTotal = '₹' + total.toLocaleString('en-IN');
  if (subtotalEl) subtotalEl.textContent = formattedTotal;
  if (totalEl)    totalEl.textContent    = formattedTotal;
  if (btnTotalEl) btnTotalEl.textContent = formattedTotal;
  if (qtyLabelEl) qtyLabelEl.textContent = count;

  // Empty cart handling
  if (cart.length === 0) {
    listEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'flex';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
    }
    updateCustomizationSection([]);
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.style.cursor = 'pointer';
  }

  // Populate products list
  listEl.innerHTML = '';
  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'summary-product-item';
    itemEl.innerHTML = `
      <div class="summary-img-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="summary-product-details">
        <div class="summary-product-top">
          <div>
            <div class="summary-badge-row">
              <span class="summary-category">${item.category || 'Product'}</span>
              ${item.customizable ? '<span class="summary-custom-tag">✦ Customizable</span>' : ''}
            </div>
            <h4 class="summary-product-name" title="${item.name}">${item.name}</h4>
          </div>
          <button type="button" class="summary-item-remove" onclick="removeCheckoutItem('${item.id}')" aria-label="Remove ${item.name}" title="Remove item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="summary-price-row">
          <div class="qty-selector">
            <button type="button" class="qty-btn" onclick="changeCheckoutQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
            <span class="qty-val">${item.qty}</span>
            <button type="button" class="qty-btn" onclick="changeCheckoutQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
          </div>
          <div style="text-align: right;">
            <div class="summary-unit-price">₹${item.price.toLocaleString('en-IN')} ea</div>
            <span class="summary-item-total">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    `;
    listEl.appendChild(itemEl);
  });

  updateCustomizationSection(cart);
}

// ---- Update Customization Section Based on Cart Items ----
function updateCustomizationSection(cart) {
  const customCard      = document.getElementById('customizationCard');
  const customCallout   = document.getElementById('customCallout');
  const customNotesSub  = document.getElementById('customNotesSub');
  const custNotesLabel  = document.getElementById('custNotesLabel');
  const custNotesInput  = document.getElementById('custNotes');

  if (!customCard) return;

  const customizableItems = cart.filter(i => i.customizable);

  if (customizableItems.length > 0) {
    customCard.style.display = 'block';
    if (customCallout) customCallout.style.display = 'block';
    const names = customizableItems.map(i => i.name).join(', ');
    if (customNotesSub) customNotesSub.textContent = `Customizable pieces in your order: ${names}. Tell us your preferences below.`;
    if (custNotesLabel) custNotesLabel.textContent = 'Customization Details / Special Instructions';
    if (custNotesInput) custNotesInput.placeholder = `e.g. Preferred car models for posters, frame colors, or personal photo requests...`;
  } else if (cart.length > 0) {
    // Only non-customizable pieces (e.g. Kashmiri Bangles)
    customCard.style.display = 'block';
    if (customCallout) customCallout.style.display = 'none';
    if (customNotesSub) customNotesSub.textContent = 'Any delivery timing or gift packaging notes for this order (Optional).';
    if (custNotesLabel) custNotesLabel.textContent = 'Order / Delivery Notes (Optional)';
    if (custNotesInput) custNotesInput.placeholder = 'e.g. Preferred delivery time, gift wrap request...';
  } else {
    customCard.style.display = 'none';
  }
}

// ---- Change Item Quantity on Checkout ----
function changeCheckoutQty(productId, delta) {
  if (!window.VFCart) return;
  const cart = window.VFCart.get();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  const newQty = (item.qty || 1) + delta;
  window.VFCart.updateQty(productId, newQty);
  renderCheckoutItems();
}
window.changeCheckoutQty = changeCheckoutQty;

// ---- Remove Item on Checkout ----
function removeCheckoutItem(productId) {
  if (!window.VFCart) return;
  window.VFCart.remove(productId);
  renderCheckoutItems();
}
window.removeCheckoutItem = removeCheckoutItem;

// ---- Radio Option Selection Highlight ----
function updatePaymentSelection(radio) {
  document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
  const parent = radio.closest('.payment-option');
  if (parent) parent.classList.add('selected');
}
window.updatePaymentSelection = updatePaymentSelection;

// ---- Validation Helpers ----
function validateField(input, errorEl, condition) {
  if (condition) {
    input.classList.remove('invalid');
    if (errorEl) errorEl.classList.remove('visible');
    return true;
  } else {
    input.classList.add('invalid');
    if (errorEl) errorEl.classList.add('visible');
    return false;
  }
}

// ---- Order Form Submission ----
function handleOrderSubmit(e) {
  e.preventDefault();

  const cart = window.VFCart ? window.VFCart.get() : [];
  if (cart.length === 0) {
    alert('Your cart is empty! Please add products before checking out.');
    window.location.href = 'index.html#products';
    return;
  }

  const nameInput    = document.getElementById('custName');
  const phoneInput   = document.getElementById('custPhone');
  const addressInput = document.getElementById('custAddress');
  const cityInput    = document.getElementById('custCity');
  const stateInput   = document.getElementById('custState');
  const pincodeInput = document.getElementById('custPincode');
  const landmarkInput= document.getElementById('custLandmark');
  const notesInput   = document.getElementById('custNotes');

  const errName    = document.getElementById('errName');
  const errPhone   = document.getElementById('errPhone');
  const errAddress = document.getElementById('errAddress');
  const errCity    = document.getElementById('errCity');
  const errState   = document.getElementById('errState');
  const errPincode = document.getElementById('errPincode');

  const vName    = validateField(nameInput, errName, nameInput.value.trim().length >= 2);
  const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
  const vPhone   = validateField(phoneInput, errPhone, phoneVal.length === 10);
  const vAddress = validateField(addressInput, errAddress, addressInput.value.trim().length >= 5);
  const vCity    = validateField(cityInput, errCity, cityInput.value.trim().length >= 2);
  const vState   = validateField(stateInput, errState, stateInput.value !== '');
  const pinVal   = pincodeInput.value.trim().replace(/\D/g, '');
  const vPincode = validateField(pincodeInput, errPincode, pinVal.length === 6);

  if (!vName || !vPhone || !vAddress || !vCity || !vState || !vPincode) {
    const firstInvalid = document.querySelector('.form-input.invalid, .form-select.invalid, .form-textarea.invalid');
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Generate Unique Order Reference
  const randomId = Math.floor(10000 + Math.random() * 90000);
  const orderId = `VF-${randomId}`;

  const selectedPayment = 'WhatsApp Confirmation (8899928634)';
  const totalAmount = window.VFCart.getTotal();
  const totalItemsCount = window.VFCart.getCount();

  const orderData = {
    orderId: orderId,
    timestamp: new Date().toISOString(),
    items: cart.map(i => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.qty,
      total: i.price * i.qty,
      customizable: i.customizable
    })),
    totalItems: totalItemsCount,
    totalAmount: totalAmount,
    customer: {
      name: nameInput.value.trim(),
      phone: phoneVal,
      address: addressInput.value.trim(),
      landmark: landmarkInput ? landmarkInput.value.trim() : '',
      city: cityInput.value.trim(),
      state: stateInput.value,
      pincode: pinVal
    },
    notes: notesInput ? notesInput.value.trim() : '',
    paymentMethod: selectedPayment
  };

  // Persist order in localStorage
  try {
    const existingOrders = JSON.parse(localStorage.getItem('vf_orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('vf_orders', JSON.stringify(existingOrders));
    localStorage.setItem('vf_last_order', JSON.stringify(orderData));
  } catch (err) {
    console.warn('Could not save to localStorage', err);
  }

  // Display Confirmation Modal
  showOrderConfirmation(orderData);

  // Clear cart after placing order
  if (window.VFCart) {
    window.VFCart.clear();
  }
}
window.handleOrderSubmit = handleOrderSubmit;

// ---- Display Order Confirmation Modal ----
function showOrderConfirmation(order) {
  document.getElementById('modalOrderId').textContent       = `#${order.orderId}`;
  document.getElementById('modalTotalItems').textContent    = order.totalItems;
  document.getElementById('modalCustomerName').textContent  = order.customer.name;
  document.getElementById('modalCustomerPhone').textContent = `+91 ${order.customer.phone}`;

  const formattedAddr = order.customer.landmark
    ? `${order.customer.address}, Landmark: ${order.customer.landmark}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`
    : `${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`;
  document.getElementById('modalAddress').textContent       = formattedAddr;

  const modalPaymentEl = document.getElementById('modalPayment');
  if (modalPaymentEl) modalPaymentEl.textContent = order.paymentMethod;

  document.getElementById('modalTotal').textContent         = `₹${order.totalAmount.toLocaleString('en-IN')}`;

  // Populate multiple ordered items inside modal
  const modalItemsSummary = document.getElementById('modalItemsSummary');
  if (modalItemsSummary) {
    modalItemsSummary.innerHTML = '';
    order.items.forEach(item => {
      const itemRow = document.createElement('div');
      itemRow.className = 'modal-item-row';
      itemRow.innerHTML = `
        <div class="modal-item-name-qty">
          <span class="modal-item-title">${item.name}</span>
          <span class="modal-item-qty">× ${item.quantity}</span>
        </div>
        <span class="modal-item-price">₹${item.total.toLocaleString('en-IN')}</span>
      `;
      modalItemsSummary.appendChild(itemRow);
    });
  }

  // Build WhatsApp prefilled message listing ALL products
  let itemsListText = order.items.map((it, idx) =>
    `  ${idx + 1}. ${it.name} (x${it.quantity}) — ₹${it.total.toLocaleString('en-IN')}`
  ).join('\n');

  let waMsg = `Hi Vogue Frames! I would like to confirm my order:\n\n` +
    `*Order ID:* #${order.orderId}\n` +
    `*Total Items:* ${order.totalItems}\n` +
    `*Total Amount:* ₹${order.totalAmount.toLocaleString('en-IN')}\n\n` +
    `*--- Ordered Products ---*\n` +
    `${itemsListText}\n\n` +
    `*--- Delivery Details ---*\n` +
    `*Name:* ${order.customer.name}\n` +
    `*Phone no:* +91 ${order.customer.phone}\n` +
    `*Address (Street, House no.):* ${order.customer.address}\n`;

  if (order.customer.landmark) {
    waMsg += `*Landmark:* ${order.customer.landmark}\n`;
  }

  waMsg += `*Pincode:* ${order.customer.pincode}\n` +
    `*City & State:* ${order.customer.city}, ${order.customer.state}\n`;

  if (order.notes) {
    waMsg += `*Customization Details:* ${order.notes}\n`;
  }

  waMsg += `\nPlease share payment details to confirm.`;

  // WhatsApp redirect directly to 8899928634 (+91 88999 28634)
  const WHATSAPP_PHONE = '918899928634';
  const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;
  const waBtn = document.getElementById('modalWhatsAppBtn');
  if (waBtn) {
    waBtn.href = waLink;
  }

  // Open modal
  const modal = document.getElementById('orderSuccessModal');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ---- Auto helpers for phone and pincode inputs ----
function initFormInputHelpers() {
  const phoneInput = document.getElementById('custPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  const pinInput   = document.getElementById('custPincode');
  const stateInput = document.getElementById('custState');
  if (pinInput) {
    pinInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
      const pin = e.target.value;
      if (pin.length === 6 && stateInput && !stateInput.value) {
        const prefix = parseInt(pin.slice(0, 2), 10);
        if (prefix === 11) stateInput.value = 'Delhi';
        else if (prefix >= 12 && prefix <= 13) stateInput.value = 'Haryana';
        else if (prefix >= 14 && prefix <= 16) stateInput.value = 'Punjab';
        else if (prefix === 17) stateInput.value = 'Himachal Pradesh';
        else if (prefix >= 18 && prefix <= 19) stateInput.value = 'Jammu & Kashmir';
        else if (prefix >= 20 && prefix <= 28) stateInput.value = 'Uttar Pradesh';
        else if (prefix >= 30 && prefix <= 34) stateInput.value = 'Rajasthan';
        else if (prefix >= 36 && prefix <= 39) stateInput.value = 'Gujarat';
        else if (prefix >= 40 && prefix <= 44) stateInput.value = 'Maharashtra';
        else if (prefix >= 45 && prefix <= 49) stateInput.value = 'Madhya Pradesh';
        else if (prefix >= 50 && prefix <= 53) stateInput.value = 'Telangana';
        else if (prefix >= 56 && prefix <= 59) stateInput.value = 'Karnataka';
        else if (prefix >= 60 && prefix <= 64) stateInput.value = 'Tamil Nadu';
        else if (prefix >= 67 && prefix <= 69) stateInput.value = 'Kerala';
        else if (prefix >= 70 && prefix <= 74) stateInput.value = 'West Bengal';
        else if (prefix >= 80 && prefix <= 85) stateInput.value = 'Bihar';
      }
    });
  }
}

// ---- Initialization ----
(function init() {
  initFormInputHelpers();

  // If a specific product was requested via query param (e.g. from Buy Now button)
  const prodId = getProductFromUrl();
  if (prodId && typeof PRODUCTS_DATA !== 'undefined' && PRODUCTS_DATA[prodId]) {
    const product = PRODUCTS_DATA[prodId];
    if (window.VFCart) {
      const cart = window.VFCart.get();
      // If product not already in cart, add it
      if (!cart.some(item => item.id === product.id)) {
        window.VFCart.add(product, 1);
      }
    }
  }

  // Render all cart items on checkout
  renderCheckoutItems();

  // Listen for live cart updates
  window.addEventListener('vf-cart-updated', () => {
    renderCheckoutItems();
  });
})();
