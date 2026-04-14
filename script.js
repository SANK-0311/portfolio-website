/* ============================================
   SANTHOSH KUMAR — Portfolio Script
   ============================================ */

// ─── Navbar: scroll + mobile toggle ──────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  scrollTopBtn.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  const open  = navLinks.classList.contains('open');
  bars[0].style.transform = open ? 'translateY(7px) rotate(45deg)'  : '';
  bars[1].style.opacity   = open ? '0' : '1';
  bars[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '1';
    });
  });
});

// ─── Active nav link on scroll ───────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ─── Smooth scroll offset for fixed nav ──────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.querySelector('.navbar').offsetHeight;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ─── Scroll to top ───────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── Reveal on scroll (IntersectionObserver) ─────
const revealEls = document.querySelectorAll('.reveal');
const timelineItems = document.querySelectorAll('.timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.08}s`;
      entry.target.classList.add('visible');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach(el => timelineObserver.observe(el));

// ─── Project card stagger ─────────────────────────
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 2) * 0.1}s`;
      entry.target.classList.add('visible');
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

projectCards.forEach(c => projectObserver.observe(c));

// ─── Cursor glow effect (desktop only) ───────────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    background: radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: transform;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0, gx = 0, gy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function animGlow() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(animGlow);
  }
  animGlow();
}

// ─── Console Easter egg ───────────────────────────
console.log('%c🚀 SANTHOSH KUMAR', 'font-size:18px; font-weight:800; background:linear-gradient(135deg,#00d4ff,#7c3aed,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent;');
console.log('%cAerospace Engineer · AI/ML Developer · IIT Bombay', 'font-size:13px; color:#7878a0');
console.log('%c✉ 24m0010@iitb.ac.in', 'font-size:12px; color:#00d4ff');