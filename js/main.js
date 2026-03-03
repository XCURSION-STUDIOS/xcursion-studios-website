// ─── CURSOR ───────────────────────────────────────────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function loop() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(loop);
})();

document.addEventListener('mouseover', e => {
  const h = e.target.closest('a,button,.proj-card,.blog-card,.shop-item,.value-item,.code-card');
  cursor.style.width      = h ? '18px' : '8px';
  cursor.style.height     = h ? '18px' : '8px';
  cursorRing.style.width  = h ? '52px' : '32px';
  cursorRing.style.height = h ? '52px' : '32px';
});

// ─── SECTION ENGINE ───────────────────────────────────────────────────────────
const SECTIONS    = 6;
const wrapper     = document.getElementById('sectionsWrapper');
let current       = 0;
let transitioning = false;

// Clean slide transition — no veil, no blackout
wrapper.style.transition = 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1)';

function goTo(index) {
  if (index === current || transitioning || index < 0 || index >= SECTIONS) return;
  transitioning = true;
  current = index;

  wrapper.style.transform = 'translateY(-' + (index * 100) + 'vh)';

  // Reset inner scroll of sections we are leaving
  document.querySelectorAll('.section.scrollable').forEach((s, i) => {
    if (i !== index) s.scrollTop = 0;
  });

  updateNav();

  setTimeout(() => {
    transitioning = false;
    triggerReveals(index);
  }, 780);
}

function updateNav() {
  document.querySelectorAll('[data-section]').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.section) === current);
  });
}

function triggerReveals(index) {
  const sections = document.querySelectorAll('.section');
  if (!sections[index]) return;
  sections[index].querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 80 + 60);
  });
}

// ─── SCROLL / WHEEL ───────────────────────────────────────────────────────────
let wheelLocked = false;

document.addEventListener('wheel', e => {
  e.preventDefault();
  if (transitioning || wheelLocked) return;

  const section      = document.querySelectorAll('.section')[current];
  const isScrollable = section && section.classList.contains('scrollable');

  if (isScrollable) {
    const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 8;
    const atTop    = section.scrollTop <= 2;
    if (e.deltaY > 0 && !atBottom) return;
    if (e.deltaY < 0 && !atTop)    return;
  }

  if (Math.abs(e.deltaY) < 30) return;

  wheelLocked = true;
  setTimeout(() => { wheelLocked = false; }, 1000);
  goTo(e.deltaY > 0 ? current + 1 : current - 1);

}, { passive: false });

// ─── TOUCH ────────────────────────────────────────────────────────────────────
let touchStartY = 0;

document.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  if (transitioning) return;
  const diff     = touchStartY - e.changedTouches[0].clientY;
  const section  = document.querySelectorAll('.section')[current];
  const isScrollable = section && section.classList.contains('scrollable');

  if (Math.abs(diff) < 40) return;

  if (isScrollable) {
    const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 8;
    const atTop    = section.scrollTop <= 2;
    if (diff > 0 && !atBottom) return;
    if (diff < 0 && !atTop)    return;
  }

  goTo(diff > 0 ? current + 1 : current - 1);
}, { passive: true });

// ─── NAV CLICKS ───────────────────────────────────────────────────────────────
document.querySelectorAll('[data-section]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    goTo(parseInt(el.dataset.section));
  });
});

const logoLink = document.getElementById('logoLink');
if (logoLink) {
  logoLink.addEventListener('click', e => {
    e.preventDefault();
    goTo(0);
  });
}

// ─── DATA-GOTO BUTTONS ────────────────────────────────────────────────────────
document.addEventListener('click', e => {
  const el = e.target.closest('[data-goto]');
  if (el) {
    e.preventDefault();
    goTo(parseInt(el.dataset.goto));
  }
});

// ─── BLOG FILTERS ─────────────────────────────────────────────────────────────
document.addEventListener('click', e => {
  if (e.target.classList.contains('blog-filter')) {
    document.querySelectorAll('.blog-filter').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// ─── PROJECT TABS ─────────────────────────────────────────────────────────────
function switchTab(btn, type) {
  document.querySelectorAll('.proj-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('proj-visuals').style.display = type === 'visuals' ? 'grid' : 'none';
  document.getElementById('proj-coding').style.display  = type === 'coding'  ? 'grid' : 'none';
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
wrapper.style.transform = 'translateY(0)';
triggerReveals(0);
