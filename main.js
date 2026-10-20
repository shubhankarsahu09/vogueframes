/* =========================================
   VOGUE FRAMES — main.js
   Custom cursor, scroll, cart, filter, etc.
   ========================================= */

'use strict';

// ============ CUSTOM CURSOR ============
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorFollower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorFollower.style.opacity = '1';
});


// ============ NAVBAR SCROLL ============
const nav = document.getElementById('nav');

function handleNavScroll() {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });


// ============ MOBILE MENU ============
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobile() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}


// ============ SCROLL REVEAL ============
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));


// ============ PRODUCT FILTER ============
const filterPills   = document.querySelectorAll('.filter-pill');
const productCards  = document.querySelectorAll('.product-card');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    // Active pill update
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const filter = pill.dataset.filter;

    productCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// ============ CART ============
let cart = [];

function toggleCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
  showToast(`${name} added to cart!`);
  bumpBadge();
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
  bumpBadge();
}

function renderCart() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const cartTotalEl = document.getElementById('cartTotal');
  const badgeEl     = document.getElementById('cart-badge');
  const footerEl    = document.getElementById('cartFooter');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  badgeEl.textContent = count;
  cartTotalEl.textContent = '\u20B9' + total.toLocaleString('en-IN');

  // Show/hide empty state
  if (cart.length === 0) {
    cartEmptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
  } else {
    cartEmptyEl.style.display = 'none';
    footerEl.style.display = 'flex';
  }

  // Remove existing items (but not the empty el)
  const existingItems = cartItemsEl.querySelectorAll('.cart-item');
  existingItems.forEach(el => el.remove());

  // Re-render
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}${item.qty > 1 ? ' &#215;' + item.qty : ''}</div>
        <div class="cart-item-price">&#8377;${(item.price * item.qty).toLocaleString('en-IN')}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.name}')" aria-label="Remove">&#215;</button>
    `;
    cartItemsEl.appendChild(el);
  });
}

function bumpBadge() {
  const badge = document.getElementById('cart-badge');
  badge.classList.remove('bump');
  badge.offsetHeight; // reflow
  badge.classList.add('bump');
}

// Initialize cart footer hidden
document.getElementById('cartFooter').style.display = 'none';


// ============ TOAST ============
let toastTimer;

function showToast(msg) {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


// ============ CONTACT FORM ============
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-form-btn');
  const originalContent = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  // Simulate async
  setTimeout(() => {
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Inquiry Sent!</span>
    `;
    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

    showToast('Inquiry sent! We will reach out shortly.');

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.style.background = '';
      btn.disabled = false;
      document.getElementById('contactForm').reset();
    }, 3500);
  }, 1500);
}


// ============ PARALLAX ORBS ============
const orbs = document.querySelectorAll('.orb');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});


// ============ HERO SCROLL SMOOTH ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ============ NAV ACTIVE LINK ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active-nav',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));


// ============ PRODUCT CARD TILT ============
const productCardEls = document.querySelectorAll('.product-card');

productCardEls.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// ============ COLLECTION CARD PARALLAX ============
const collectionCards = document.querySelectorAll('.collection-card');

collectionCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    const img = card.querySelector('.card-img-wrap');
    if (img) {
      img.style.transform = `scale(1.04) translate(${x * 8}px, ${y * 8}px)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    const img = card.querySelector('.card-img-wrap');
    if (img) img.style.transform = '';
  });
});


// ============ SEARCH BUTTON (placeholder) ============
document.getElementById('search-btn').addEventListener('click', () => {
  showToast('Search coming soon!');
});


// ============ INIT ============
renderCart();
handleNavScroll();

console.log('%c VOGUE FRAMES ', 'background: #c9a96e; color: #000; font-size: 14px; font-weight: bold; padding: 6px 16px; border-radius: 6px;');
console.log('%c Premium E-Commerce — Built with passion ', 'color: #a1a1a6; font-size: 12px;');
