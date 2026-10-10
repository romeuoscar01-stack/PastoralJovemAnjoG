/* ==========================
   NOTÍCIAS — dados e renderização
   Usado em: pages/noticias.html (listagem) e pages/noticia.html (individual)

   Para adicionar uma notícia, copie um objeto do array abaixo.
   O campo "content" aceita HTML simples (parágrafos).
========================== */

const newsData = [
  {
    id: 1,
    title: '[TÍTULO DA NOTÍCIA]',
    date: '2025-02-10',
    category: 'Comunicado',
    excerpt: 'Um breve resumo desta notícia para aparecer na listagem.',
    content: `
      <p>[Conteúdo completo da notícia. Substitua este texto pela informação real.]</p>
      <p>Você pode adicionar quantos parágrafos forem necessários.</p>
    `
  },
  {
    id: 2,
    title: '[TÍTULO DA NOTÍCIA]',
    date: '2025-01-25',
    category: 'Celebração',
    excerpt: 'Um breve resumo desta notícia para aparecer na listagem.',
    content: `
      <p>[Conteúdo completo da notícia. Substitua este texto pela informação real.]</p>
    `
  },
  {
    id: 3,
    title: '[TÍTULO DA NOTÍCIA]',
    date: '2025-01-05',
    category: 'Formação',
    excerpt: 'Um breve resumo desta notícia para aparecer na listagem.',
    content: `
      <p>[Conteúdo completo da notícia. Substitua este texto pela informação real.]</p>
    `
  },
  {
    id: 4,
    title: '[TÍTULO DA NOTÍCIA]',
    date: '2024-12-15',
    category: 'Ação Social',
    excerpt: 'Um breve resumo desta notícia para aparecer na listagem.',
    content: `
      <p>[Conteúdo completo da notícia. Substitua este texto pela informação real.]</p>
    `
  }
];

function createNewsCard(item) {
  return `
    <article class="news-card reveal">
      <div class="news-card__image">
        <span class="news-card__placeholder">[FOTO DA NOTÍCIA]</span>
        <span class="news-card__category">${item.category}</span>
      </div>
      <div class="news-card__body">
        <span class="news-card__date">${formatEventDate(item.date)}</span>
        <h3 class="news-card__title">${item.title}</h3>
        <p class="news-card__excerpt">${item.excerpt}</p>
        <a href="noticia.html?id=${item.id}" class="news-card__link">Ler mais →</a>
      </div>
    </article>
  `;
}

/* Listagem completa (pages/noticias.html) */
function renderNewsGrid(filter) {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  const filtered = (!filter || filter === 'Todos')
    ? newsData
    : newsData.filter(item => item.category === filter);

  grid.innerHTML = filtered.length
    ? filtered.map(createNewsCard).join('')
    : '<p class="events-empty">Nenhuma notícia encontrada nesta categoria.</p>';

  grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

/* Botões de filtro por categoria (gerados dinamicamente) */
function initNewsFilters() {
  const filtersContainer = document.getElementById('newsFilters');
  if (!filtersContainer) return;

  const categories = ['Todos', ...new Set(newsData.map(item => item.category))];

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

    renderNewsGrid(btn.dataset.filter);
  });

  renderNewsGrid('Todos'); // estado inicial
}

/* Página individual (pages/noticia.html) — lê o "id" da URL */
function renderSingleNews() {
  const container = document.getElementById('newsSingle');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const item = newsData.find(news => news.id === id);

  if (!item) {
    container.innerHTML = `
      <p>Notícia não encontrada.</p>
      <a href="noticias.html" class="btn btn--outline btn--dark" style="margin-top:1rem;display:inline-flex;">← Voltar para notícias</a>
    `;
    return;
  }

  document.title = `${item.title} — PJAG`;
  document.getElementById('newsCategory').textContent = item.category;
  document.getElementById('newsDate').textContent = formatEventDate(item.date);
  document.getElementById('newsTitle').textContent = item.title;
  document.getElementById('newsContent').innerHTML = item.content;
}