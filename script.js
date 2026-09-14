const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (menu && links) {
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const featureDetails = {
  shifts: {
    title: 'Směny a kalendář',
    text: 'Členové mají přehled o aktuálních i plánovaných směnách, jejich obsazení a své nejbližší službě. Vše je dostupné v jednom společném kalendáři.',
    bullets: [
      'Přehled obsazení jednotlivých směn a rolí.',
      'Rychlá informace o aktuální a nejbližší službě.',
      'Možnost pracovat s návrhy výměn směn podle oprávnění.'
    ]
  },
  equipment: {
    title: 'Technika, revize a opravy',
    text: 'Hasičárna pomáhá udržet přehled o technice jednotky a souvisejících kontrolách. Důležité termíny a záznamy tak nejsou roztroušené na více místech.',
    bullets: [
      'Evidence techniky na jednom přehledném místě.',
      'Termíny revizí a pravidelných kontrol.',
      'Záznamy o opravách a provedených úkonech.'
    ]
  },
  members: {
    title: 'Členové jednotky',
    text: 'Kontakty a základní informace o členech jsou dostupné přímo v aplikaci, takže není potřeba dohledávat je v dalších seznamech nebo skupinách.',
    bullets: [
      'Přehledný seznam členů jednotky.',
      'Kontaktní údaje dostupné na jednom místě.',
      'Zobrazení rolí a informací podle nastavených oprávnění.'
    ]
  },
  announcements: {
    title: 'Oznámení',
    text: 'Důležité organizační informace může vedení jednotky předat členům přímo přes Hasičárnu a udržet je oddělené od běžné komunikace.',
    bullets: [
      'Jedno místo pro důležitá sdělení jednotce.',
      'Rychlejší orientace v aktuálních informacích.',
      'Správa obsahu podle uživatelských oprávnění.'
    ]
  },
  events: {
    title: 'Události',
    text: 'Plánované akce, školení a další důležité termíny lze evidovat tak, aby je členové měli stále po ruce společně s ostatními informacemi.',
    bullets: [
      'Přehled nadcházejících událostí a termínů.',
      'Informace dostupné členům celé jednotky.',
      'Události společně se směnami v každodenním přehledu.'
    ]
  },
  statistics: {
    title: 'Statistiky',
    text: 'Hasičárna nabízí rychlý přehled odpracovaných směn a hodin. Rozsah zobrazených informací se řídí oprávněním uživatele.',
    bullets: [
      'Přehled odpracovaných směn a hodin.',
      'Měsíční souhrny pro rychlou orientaci.',
      'Rozsah údajů odpovídá roli a oprávnění uživatele.'
    ]
  }
};

const featureModal = document.querySelector('#feature-modal');
const modalTitle = document.querySelector('#feature-modal-title');
const modalText = document.querySelector('#feature-modal-text');
const modalList = document.querySelector('#feature-modal-list');
let lastFeatureTrigger = null;

function openFeatureModal(card) {
  if (!featureModal || !card) return;
  const detail = featureDetails[card.dataset.feature];
  if (!detail) return;

  lastFeatureTrigger = card;
  modalTitle.textContent = detail.title;
  modalText.textContent = detail.text;
  modalList.innerHTML = detail.bullets.map((item) => `<li>${item}</li>`).join('');

  featureModal.classList.add('open');
  featureModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const closeButton = featureModal.querySelector('.feature-modal-close');
  requestAnimationFrame(() => closeButton?.focus());
}

function closeFeatureModal() {
  if (!featureModal || !featureModal.classList.contains('open')) return;
  featureModal.classList.remove('open');
  featureModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFeatureTrigger?.focus();
}

document.querySelectorAll('.feature-card[data-feature]').forEach((card) => {
  card.addEventListener('click', () => openFeatureModal(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFeatureModal(card);
    }
  });
});

document.querySelectorAll('[data-modal-close]').forEach((element) => {
  element.addEventListener('click', closeFeatureModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeFeatureModal();
});
