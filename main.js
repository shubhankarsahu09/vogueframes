/* =========================================
   VOGUE FRAMES — main.js
   Custom cursor, scroll, cart, filter, etc.
   ========================================= */

'use strict';

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
  if (hamburger) hamburger.classList.toggle('open');
  if (mobileMenu) mobileMenu.classList.toggle('open');
  document.body.style.overflow = (mobileMenu && mobileMenu.classList.contains('open')) ? 'hidden' : '';
}

function closeMobile() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// Close mobile menu or cart on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobile();
    if (typeof closeCart === 'function') closeCart();
  }
});


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

// Expose globally for product.js
window.revealObserver = revealObserver;

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


// ============ CART DELEGATION (Handled by cart.js) ============
// VFCart manages localStorage persistence and multi-product cart functionality.

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


// ============ CONTACT FORM (Web3Forms Integration) ============
async function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submit-form-btn');
  const originalContent = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  try {
    const formData = new FormData(form);
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Message Sent!</span>
      `;
      btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
      showToast('Message delivered! We will reach out shortly.');
      form.reset();
    } else {
      showToast(result.message || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    console.error('Web3Forms Error:', err);
    showToast('Network error. Please try again or reach out on Instagram.');
  } finally {
    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }
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
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    showToast('Search coming soon!');
  });
}


// ============ PRODUCT CARD NAVIGATION ============
document.querySelectorAll('.product-card[data-url]').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const url = card.dataset.url;
    if (url) {
      window.location.href = url;
    }
  });
});


// ============ INIT ============
if (typeof window.renderCart === 'function') {
  window.renderCart();
}
handleNavScroll();

console.log('%c VOGUE FRAMES ', 'background: #c9a96e; color: #000; font-size: 14px; font-weight: bold; padding: 6px 16px; border-radius: 6px;');
console.log('%c Premium E-Commerce — Built with passion ', 'color: #a1a1a6; font-size: 12px;');
