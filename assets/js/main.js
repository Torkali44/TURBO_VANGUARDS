const WA_NUMBER = '971527288800';

function waLink(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── WhatsApp data-wa buttons ───────────────────────────────────────────────
document.querySelectorAll('[data-wa]').forEach(el => {
  const msg = el.getAttribute('data-wa');
  el.href = waLink(msg);
  el.target = '_blank';
  el.rel = 'noopener';
});

// ─── Header scroll shadow ────────────────────────────────────────────────────
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ─── Scroll reveal (IntersectionObserver) ───────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// ─── Gallery Slider with arrows ─────────────────────────────────────────────
document.querySelectorAll('.product-gallery').forEach(gallery => {
  const mainImg   = gallery.querySelector('.gallery-main img');
  const thumbs    = gallery.querySelectorAll('.gallery-thumb');
  const prevArrow = gallery.querySelector('.gallery-arrow.prev');
  const nextArrow = gallery.querySelector('.gallery-arrow.next');

  if (!thumbs.length || !mainImg) return;

  function setActive(thumb) {
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const src = thumb.querySelector('img')?.src;
    if (src) {
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
      }, 160);
    }
    // scroll thumbnail into view
    thumb.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
  }

  thumbs.forEach(t => t.addEventListener('click', () => setActive(t)));

  if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', () => {
      const arr = Array.from(thumbs);
      let idx = arr.findIndex(t => t.classList.contains('active')) - 1;
      if (idx < 0) idx = arr.length - 1;
      setActive(arr[idx]);
    });
    nextArrow.addEventListener('click', () => {
      const arr = Array.from(thumbs);
      let idx = arr.findIndex(t => t.classList.contains('active')) + 1;
      if (idx >= arr.length) idx = 0;
      setActive(arr[idx]);
    });
  }

  // keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') prevArrow?.click();
    if (e.key === 'ArrowLeft')  nextArrow?.click();
  });
});

// ─── Hide demo btn if href is "#" ────────────────────────────────────────────
document.querySelectorAll('.btn-demo').forEach(btn => {
  const href = btn.getAttribute('href') || '';
  if (!href || href === '#' || href.trim() === '') {
    btn.style.display = 'none';
  }
});

// ─── Mobile navigation ───────────────────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const siteHeader = document.querySelector('header');
if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => {
    const open = siteHeader.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.textContent = open ? '✕' : '☰';
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && siteHeader.classList.contains('nav-open')) {
      siteHeader.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    }
  }, { passive: true });
}

// ─── WhatsApp Contact Form ───────────────────────────────────────────────────
const contactForm = document.getElementById('wa-contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const agree = document.getElementById('terms-agree');
    if (agree && !agree.checked) {
      agree.focus();
      alert('يرجى الموافقة على جميع الشروط والأحكام قبل الإرسال.');
      return;
    }

    const name    = document.getElementById('client-name')?.value.trim();
    const phone   = document.getElementById('client-phone')?.value.trim();
    const email   = document.getElementById('client-email')?.value.trim();
    const idNum   = document.getElementById('client-id')?.value.trim();
    const siteType = contactForm.querySelector('input[name="site-type"]:checked')?.value;
    const details = document.getElementById('project-details')?.value.trim();

    let msg = `السلام عليكم فريق Turbo VanGuards 👋\n\n`;
    msg += `📋 *نموذج عميل جديد*\n\n`;
    msg += `*بيانات التواصل:*\n`;
    if (name)  msg += `👤 الاسم الكامل: ${name}\n`;
    if (phone) msg += `📱 رقم الهاتف: ${phone}\n`;
    if (email) msg += `✉️ البريد: ${email}\n`;
    if (idNum) msg += `🪪 رقم الهوية: ${idNum}\n`;
    msg += `\n*معلومات المشروع:*\n`;
    if (siteType) msg += `🌐 نوع الموقع: ${siteType}\n`;
    if (details)  msg += `📝 التفاصيل:\n${details}\n`;
    msg += `\n✅ أوافق على جميع الشروط والأحكام\n`;
    msg += `💰 قيمة الخدمة: 1400 درهم إ.م`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// ─── Light / Dark Mode Toggle ────────────────────────────────────────────────
const themeBtn  = document.getElementById('theme-toggle');
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    if (themeBtn) themeBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('light-mode');
    if (themeBtn) themeBtn.textContent = '🌙';
  }
}

// load saved preference
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
applyTheme(savedTheme);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-mode');
    const newTheme = isLight ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  });
}

// ─── Animated number counters ─────────────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
  if (!target) return;
  const prefix = el.textContent.replace(/[0-9]/g, '').replace(target.toString(), '');
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = prefix + current;
  }, 30);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statsObserver.observe(el));
