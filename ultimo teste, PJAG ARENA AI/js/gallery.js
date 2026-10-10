/* ==========================
   GALERIA — dados, renderização, filtros e lightbox
   Usado na home (preview) e na página completa (pages/galeria.html)

   Para adicionar uma foto, copie um objeto do array abaixo.
========================== */

const galleryData = [
  { id: 1, caption: 'Encontro de jovens',   category: 'Encontros' },
  { id: 2, caption: 'Retiro espiritual',     category: 'Retiros' },
  { id: 3, caption: 'Missa da pastoral',     category: 'Celebrações' },
  { id: 4, caption: 'Ação social',           category: 'Ação Social' },
  { id: 5, caption: 'Momento de louvor',     category: 'Celebrações' },
  { id: 6, caption: 'Confraternização',      category: 'Encontros' },
  { id: 7, caption: 'Missão jovem',          category: 'Ação Social' },
  { id: 8, caption: 'Celebração',            category: 'Celebrações' }
];

// Lista atualmente exibida na tela — usada pelo lightbox para navegar (próxima/anterior)
let currentGalleryView = galleryData;

function createGalleryItem(item, index) {
  return `
    <button class="gallery-item reveal" data-index="${index}" aria-label="Ampliar imagem: ${item.caption}">
      <span class="gallery-item__placeholder">[FOTO]</span>
      <span class="gallery-item__caption">${item.caption}</span>
    </button>
  `;
}

function renderGalleryGrid(containerId, items) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = items.map(createGalleryItem).join('');
}

/* Preview da home (index.html) */
function renderGallery() {
  currentGalleryView = galleryData;
  renderGalleryGrid('galleryGrid', galleryData);
}

/* Página completa (pages/galeria.html), com filtro por categoria */
function renderFullGallery(filter) {
  const items = (!filter || filter === 'Todos')
    ? galleryData
    : galleryData.filter(item => item.category === filter);

  currentGalleryView = items;
  renderGalleryGrid('fullGalleryGrid', items);

  // Itens filtrados aparecem direto, sem esperar o scroll
  document.querySelectorAll('#fullGalleryGrid .reveal').forEach(el => el.classList.add('is-visible'));
}

/* Botões de filtro da galeria completa (gerados dinamicamente a partir das categorias) */
function initGalleryFilters() {
  const filtersContainer = document.getElementById('galleryFilters');
  if (!filtersContainer) return;

  const categories = ['Todos', ...new Set(galleryData.map(item => item.category))];

  filtersContainer.innerHTML = categories.map((cat, i) => `
    <button class="filter-btn ${i === 0 ? 'is-active' : ''}" data-filter="${cat}" aria-pressed="${i === 0}">${cat}</button>
  `).join('');

  filtersContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filtersContainer.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-pressed', 'true');

    renderFullGallery(btn.dataset.filter);
  });

  renderFullGallery('Todos'); // estado inicial
}

/* ==========================
   LIGHTBOX
   Funciona tanto na home quanto na galeria completa,
   sempre navegando pela lista atualmente exibida (currentGalleryView).
========================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const caption = document.getElementById('lightboxCaption');
  const btnClose = document.getElementById('lightboxClose');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function updateLightbox() {
    caption.textContent = currentGalleryView[currentIndex].caption;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    document.body.classList.add('no-scroll');
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentGalleryView.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentGalleryView.length) % currentGalleryView.length;
    updateLightbox();
  }

  // Delegação de evento: funciona em qualquer grid de galeria presente na página
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    openLightbox(Number(item.dataset.index));
  });

  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}