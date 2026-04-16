/* ===== Navbar Scroll-Verhalten ===== */
const navbar = document.getElementById('navbar');
const header = document.querySelector('header');

let lastScrollY = 0;
let isVisible = true;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const heroEnd = header.offsetHeight;
  const scrollDelta = currentScrollY - lastScrollY;

  // Oberhalb der unteren Hero-Grenze -> immer sichtbar
  if (currentScrollY < heroEnd) {
    if (!isVisible) {
      navbar.style.transform = 'translateY(0)';
      isVisible = true;
    }
  }
  // Unterhalb der Hero Section
  else {
    // Gerade ueber die Grenze nach UNTEN gegangen -> verstecken
    if (lastScrollY < heroEnd && currentScrollY >= heroEnd) {
      navbar.style.transform = 'translateY(-100%)';
      isVisible = false;
    }
    // Gerade ueber die Grenze nach OBEN gegangen und unsichtbar -> anzeigen
    else if (lastScrollY >= heroEnd && currentScrollY < heroEnd && !isVisible) {
      navbar.style.transform = 'translateY(0)';
      isVisible = true;
    }
    // Unter Hero: Nach unten scrolling min. 10px und sichtbar -> verstecken
    else if (scrollDelta >= 10 && isVisible) {
      navbar.style.transform = 'translateY(-100%)';
      isVisible = false;
    }
    // Unter Hero: Nach oben scrolling min. 10px und unsichtbar -> anzeigen
    else if (scrollDelta <= -10 && !isVisible) {
      navbar.style.transform = 'translateY(0)';
      isVisible = true;
    }
  }

  lastScrollY = currentScrollY;
});

/* ===== Mobiles Menu: Toggle-Logik ===== */
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
  mobileMenu.classList.remove('translate-x-full');
  mobileMenu.classList.add('translate-x-0');
  document.body.classList.add('overflow-hidden');
}

function closeMenu() {
  mobileMenu.classList.remove('translate-x-0');
  mobileMenu.classList.add('translate-x-full');
  document.body.classList.remove('overflow-hidden');
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

// Menu schliessen bei Klick auf Navigationslinks oder Join-Button
mobileMenu.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.currentTarget !== menuClose) closeMenu();
  });
});

// Menu automatisch schliessen bei Resize auf Desktop-Breakpoint (md = 768px)
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMenu();
});
