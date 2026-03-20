/* shared.js — logica comune a tutte le pagine */

// ── CURSOR ──
const cur = document.getElementById('cursor');
const fol = document.getElementById('cursor-follower');
if (cur && fol) {
  let fx=0,fy=0,cx=0,cy=0;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cur.style.left = cx+'px'; cur.style.top = cy+'px';
  });
  (function anim() {
    fx += (cx-fx)*.12; fy += (cy-fy)*.12;
    fol.style.left = fx+'px'; fol.style.top = fy+'px';
    requestAnimationFrame(anim);
  })();
  document.querySelectorAll('a,button,.s-card,.t-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width='28px'; cur.style.height='28px';
      cur.style.background='transparent';
      cur.style.border='1.5px solid var(--verde)';
      cur.style.borderRadius='50%';
      fol.style.opacity='0';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width='10px'; cur.style.height='10px';
      cur.style.background='var(--verde)';
      cur.style.border='none';
      fol.style.opacity='.45';
    });
  });
}

// ── NAVBAR scroll ──
const nav = document.getElementById('siteNav');
if (nav) {
  const check = () => nav.classList.toggle('solid', window.scrollY > 20);
  window.addEventListener('scroll', check, {passive:true});
  check();
}

// ── HAMBURGER ──
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobMenu');
const mobC = document.getElementById('mobClose');
if (ham && mob) {
  function menuOpen() {
    ham.classList.add('is-open');
    mob.classList.add('is-open');
    // Nascondi logo e chatbot bubble
    var logo = document.querySelector('.nav-logo');
    var bubble = document.getElementById('chat-bubble');
    var wa = document.querySelector('.wa-btn');
    if (logo) logo.style.opacity = '0';
    if (bubble) bubble.style.opacity = '0';
    if (wa) wa.style.opacity = '0';
  }
  function menuClose() {
    ham.classList.remove('is-open');
    mob.classList.remove('is-open');
    // Mostra di nuovo logo e chatbot bubble
    var logo = document.querySelector('.nav-logo');
    var bubble = document.getElementById('chat-bubble');
    var wa = document.querySelector('.wa-btn');
    if (logo) logo.style.opacity = '1';
    if (bubble) bubble.style.opacity = '1';
    if (wa) wa.style.opacity = '1';
  }
  ham.addEventListener('click', () => {
    if (ham.classList.contains('is-open')) menuClose();
    else menuOpen();
  });
  if (mobC) mobC.addEventListener('click', menuClose);
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', menuClose));
}

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Immediate reveal for hero elements
setTimeout(() => {
  document.querySelectorAll('.hero .reveal, section:first-of-type .reveal').forEach(el => el.classList.add('in'));
}, 80);
