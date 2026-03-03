// ─── CURSOR ───────────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

(function loop() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(loop);
})();

document.addEventListener('mouseover', e => {
  const h = e.target.closest('a,button,.proj-card,.blog-card,.shop-item,.value-item,.code-card');
  cursor.style.width = h ? '18px' : '8px';
  cursor.style.height = h ? '18px' : '8px';
  cursorRing.style.width = h ? '52px' : '32px';
  cursorRing.style.height = h ? '52px' : '32px';
});

// ─── SECTION ENGINE ───────────────────────────────────────────────────────────
const SECTIONS = 6;
const wrapper = document.getElementById('sectionsWrapper');
const veil = document.getElementById('transitionVeil');
let current = 0;
let transitioning = false;

function goTo(index) {
  if (index === current || transitioning || index < 0 || index >= SECTIONS) return;
  transitioning = true;

  veil.classList.remove('fade-out');
  void veil.offsetWidth; // force reflow
  veil.classList.add('fade-in');

  setTimeout(() => {
    wrapper.style.transform = 'translateY(-' + (index * 100) + 'vh)';
    document.querySelectorAll('.section.scrollable').forEach(s => s.scrollTop = 0);
    current = index;
    updateNav();

    veil.classList.remove('fade-in');
    void veil.offsetWidth;
    veil.classList.add('fade-out');

    setTimeout(() => {
      veil.classList.remove('fade-out');
      transitioning = false;
      triggerReveals(index);
    }, 580);
  }, 420);
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
let wheelLock = false;

document.addEventListener('wheel', e => {
  e.preventDefault();
  if (wheelLock || transitioning) return;

  const section = document.querySelectorAll('.section')[current];
  if (section && section.classList.contains('scrollable')) {
    const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 10;
    const atTop = section.scrollTop <= 2;
    if (e.deltaY > 0 && !atBottom) return;
    if (e.deltaY < 0 && !atTop) return;
  }

  wheelLock = true;
  setTimeout(() => { wheelLock = false; }, 1200);
  goTo(e.deltaY > 0 ? current + 1 : current - 1);
}, { passive: false });

// ─── TOUCH ────────────────────────────────────────────────────────────────────
let touchY = 0;

document.addEventListener('touchstart', e => {
  touchY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  const diff = touchY - e.changedTouches[0].clientY;
  if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
}, { passive: true });

// ─── NAV CLICKS ───────────────────────────────────────────────────────────────
document.querySelectorAll('[data-section]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    goTo(parseInt(el.dataset.section));
  });
});

document.getElementById('logoLink').addEventListener('click', e => {
  e.preventDefault();
  goTo(0);
});

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
  document.getElementById('proj-coding').style.display = type === 'coding' ? 'grid' : 'none';
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
wrapper.style.transform = 'translateY(0)';
triggerReveals(0);
