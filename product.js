/* =========================================
   VOGUE FRAMES — product.js
   Loads & renders product detail page
   ========================================= */

'use strict';

// ---- Get product ID from URL ----
function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// ---- Go Back Navigation ----
function goBack(e) {
  if (e) e.preventDefault();
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html#products';
  }
}
window.goBack = goBack;

// ---- Render star SVGs ----
function renderStars(rating, size = 16) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  let html = '';

  const starFull = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  const starHalf = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><defs><linearGradient id="hg"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#hg)" stroke="currentColor"/></svg>`;
  const starEmpty= `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  for (let i = 0; i < full; i++) html += starFull;
  if (half) html += starHalf;
  for (let i = 0; i < empty; i++) html += starEmpty;
  return html;
}

// ---- Render the full product page ----
function renderProduct(product) {
  // Update page title & meta
  document.title = `${product.name} — vogue.frames._`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = product.description.slice(0, 160);

  // Breadcrumb
  document.getElementById('bcProductName').textContent = product.name;

  // Main image
  const mainImg = document.getElementById('pdMainImg');
  mainImg.src = product.image;
  mainImg.alt = product.name;

  // Lightbox on click
  document.getElementById('pdMainImgWrap').addEventListener('click', () => openLightbox(product.image, product.name));

  // Thumbnails
  const thumbsEl = document.getElementById('pdThumbnails');
  product.images.forEach((img, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'pd-thumb' + (i === 0 ? ' active' : '');
    thumb.innerHTML = `<img src="${img}" alt="${product.name}" />`;
    thumb.addEventListener('click', () => {
      mainImg.src = img;
      document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    thumbsEl.appendChild(thumb);
  });

  // Category + Badge
  document.getElementById('pdCategory').textContent = product.category;
  const badgeEl = document.getElementById('pdBadge');
  if (product.badge) {
    badgeEl.textContent = product.badge;
  } else {
    badgeEl.style.display = 'none';
  }

  // Name
  document.getElementById('pdName').textContent = product.name;

  // Rating row
  document.getElementById('pdStars').innerHTML = renderStars(product.rating);
  document.getElementById('pdRatingNum').textContent = product.rating.toFixed(1);
  document.getElementById('pdReviewCount').textContent = `(${product.reviewCount} reviews)`;

  // Price
  document.getElementById('pdPrice').textContent = '₹' + product.price.toLocaleString('en-IN');
  const origPrice = document.getElementById('pdOrigPrice');
  if (product.originalPrice) {
    origPrice.textContent = '₹' + product.originalPrice.toLocaleString('en-IN');
  }

  // Customization trust pill update based on product data
  const customTrustPill = document.getElementById('pdCustomTrustPill');

  if (product.customizable) {
    if (customTrustPill) {
      customTrustPill.className = 'trust-pill trust-pill-gold';
      customTrustPill.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>100% Fully Customizable</span>
      `;
    }
  } else {
    if (customTrustPill) {
      customTrustPill.className = 'trust-pill';
      customTrustPill.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>100% Authentic Handcrafted</span>
      `;
    }
  }

  // Highlights
  const highlightsEl = document.getElementById('pdHighlights');
  product.highlights.forEach(h => {
    const li = document.createElement('li');
    li.className = 'pd-highlight-item';
    li.innerHTML = `
      <div class="pd-highlight-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span>${h}</span>
    `;
    highlightsEl.appendChild(li);
  });

  // Specs table
  const specsEl = document.getElementById('pdSpecsTable');
  Object.entries(product.specs).forEach(([key, val]) => {
    const row = document.createElement('div');
    row.className = 'pd-spec-row';
    row.innerHTML = `<span class="pd-spec-key">${key}</span><span class="pd-spec-val">${val}</span>`;
    specsEl.appendChild(row);
  });

  // Description
  document.getElementById('pdDescription').textContent = product.description;

  // Reviews summary
  document.getElementById('pdRatingBig').textContent = product.rating.toFixed(1);
  document.getElementById('pdStarsBig').innerHTML = renderStars(product.rating, 20);
  document.getElementById('pdReviewsTotal').textContent = `${product.reviewCount} reviews`;

  // Review cards
  const reviewsGrid = document.getElementById('pdReviewsGrid');
  product.reviews.forEach(review => {
    const card = document.createElement('div');
    card.className = 'pd-review-card reveal';
    card.innerHTML = `
      <div class="pd-review-stars">${renderStars(review.rating, 14)}</div>
      <p class="pd-review-text">"${review.text}"</p>
      <div class="pd-review-author">
        <div class="pd-review-avatar">${review.initials}</div>
        <div>
          <div class="pd-review-name">${review.name}</div>
          <div class="pd-review-handle">${review.handle}</div>
        </div>
      </div>
    `;
    reviewsGrid.appendChild(card);
  });

  // Wire up add to cart and buy now buttons
  window._currentProduct = product;
  const addBtn = document.getElementById('pdAddToCart');
  if (addBtn) {
    addBtn.onclick = pdAddToCart;
  }
  const buyBtn = document.getElementById('pdBuyNow');
  if (buyBtn) {
    buyBtn.onclick = pdBuyNow;
  }

  // Observe reveals on dynamically added elements
  const ro = (typeof revealObserver !== 'undefined' && revealObserver) || window.revealObserver;
  if (ro) {
    document.querySelectorAll('.reveal').forEach(el => {
      ro.observe(el);
    });
  }

  // Animate page in
  const page = document.getElementById('productPage');
  page.style.opacity = '0';
  page.style.transform = 'translateY(20px)';
  requestAnimationFrame(() => {
    page.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    page.style.opacity = '1';
    page.style.transform = 'translateY(0)';
  });
}

// ---- Add to cart from product page ----
function pdAddToCart() {
  const product = window._currentProduct;
  if (!product) return;
  if (window.VFCart) {
    window.VFCart.add(product, 1);
    window.VFCart.toggleDrawer(true);
  }
}
window.pdAddToCart = pdAddToCart;

// ---- Buy Now — Adds to cart & navigates directly to order form ----
function pdBuyNow() {
  const product = window._currentProduct;
  if (!product) return;
  if (window.VFCart) {
    window.VFCart.add(product, 1);
  }
  window.location.href = `checkout.html?product=${encodeURIComponent(product.id)}`;
}
window.pdBuyNow = pdBuyNow;

// ---- Show not found state ----
function showNotFound() {
  const page = document.getElementById('productPage');
  page.innerHTML = `
    <div class="container">
      <div class="pd-not-found">
        <div style="font-size:60px">🔍</div>
        <h2>Product Not Found</h2>
        <p>This product doesn't exist or may have been removed.</p>
        <a href="index.html#products" class="btn btn-primary liquid-btn" style="margin-top:8px">
          <span>Back to Shop</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  `;
}

// ---- Lightbox ----
function openLightbox(src, alt) {
  const lb    = document.getElementById('pdLightbox');
  const lbImg = document.getElementById('pdLightboxImg');
  lbImg.src = src;
  lbImg.alt = alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('pdLightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Close lightbox on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ---- INIT ----
(function init() {
  const id = getProductId();

  if (!id || !PRODUCTS_DATA[id]) {
    showNotFound();
    return;
  }

  renderProduct(PRODUCTS_DATA[id]);
})();
