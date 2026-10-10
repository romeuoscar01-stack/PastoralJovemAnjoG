/* ==========================
   EVENTOS — dados, renderização e filtros
   Usado na home (preview) e na página completa (pages/eventos.html)

   Para adicionar um evento, copie um objeto do array abaixo.
   status: 'upcoming' (futuro) ou 'past' (já realizado)
========================== */

const eventsData = [
  {
    id: 1,
    title: '[NOME DO EVENTO]',
    date: '2025-03-15',
    time: '19h30',
    location: '[NOME DA PARÓQUIA]',
    category: 'Encontro',
    description: 'Uma noite de louvor, partilha e comunhão entre os jovens da pastoral.',
    status: 'upcoming'
  },
  {
    id: 2,
    title: '[NOME DO EVENTO]',
    date: '2025-04-05',
    time: '08h00',
    location: '[LOCAL DO RETIRO]',
    category: 'Retiro',
    description: 'Um fim de semana de oração, silêncio e renovação espiritual.',
    status: 'upcoming'
  },
  {
    id: 3,
    title: '[NOME DO EVENTO]',
    date: '2025-05-20',
    time: '15h00',
    location: '[LOCAL DA AÇÃO]',
    category: 'Ação Social',
    description: 'Momento de serviço e caridade com a comunidade local.',
    status: 'upcoming'
  },
  {
    id: 4,
    title: '[NOME DO EVENTO PASSADO]',
    date: '2024-11-10',
    time: '19h00',
    location: '[NOME DA PARÓQUIA]',
    category: 'Retiro',
    description: 'Um momento marcante de renovação espiritual vivido pela pastoral.',
    status: 'past'
  }
];

function formatEventDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function createEventCard(event) {
  return `
    <article class="event-card reveal">
      <div class="event-card__image">
        <span class="event-card__placeholder">[FOTO DO EVENTO]</span>
        <span class="event-card__category">${event.category}</span>
      </div>
      <div class="event-card__body">
        <div class="event-card__meta">
          <span class="event-card__date">${formatEventDate(event.date)}</span>
          <span class="event-card__time">${event.time}</span>
        </div>
        <h3 class="event-card__title">${event.title}</h3>
        <p class="event-card__location">${event.location}</p>
        <p class="event-card__description">${event.description}</p>
        <a href="eventos.html" class="event-card__link">Ver detalhes →</a>
      </div>
    </article>
  `;
}

/* Preview da home (index.html) — mostra apenas os próximos eventos */
function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  const upcoming = eventsData.filter(event => event.status === 'upcoming');
  grid.innerHTML = upcoming.map(createEventCard).join('');
}

/* Página completa (pages/eventos.html) — com filtro */
function renderEventsPage(filter) {
  const grid = document.getElementById('allEventsGrid');
  if (!grid) return;

  let filtered = filter === 'all'
    ? [...eventsData]
    : eventsData.filter(event => event.status === filter);

  // Próximos: do mais próximo para o mais distante. Passados: do mais recente para o mais antigo.
  filtered.sort((a, b) => filter === 'past'
    ? new Date(b.date) - new Date(a.date)
    : new Date(a.date) - new Date(b.date)
  );

  grid.innerHTML = filtered.length
    ? filtered.map(createEventCard).join('')
    : '<p class="events-empty">Nenhum evento encontrado nesta categoria.</p>';

  // Itens filtrados aparecem direto, sem esperar o scroll
  grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

/* Botões de filtro da página de eventos */
function initEventsFilters() {
  const container = document.getElementById('eventsFilters');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    container.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-pressed', 'true');

    renderEventsPage(btn.dataset.filter);
  });

  renderEventsPage('upcoming'); // estado inicial
}