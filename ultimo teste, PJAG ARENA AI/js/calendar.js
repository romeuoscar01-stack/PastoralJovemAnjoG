/* ==========================
   CALENDÁRIO — visualização mensal
   Depende de: js/events.js (eventsData e createEventCard devem existir)
   Usado em: pages/calendario.html
========================== */

const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

let calendarViewDate = new Date(); // mês/ano atualmente exibido no calendário

function formatDateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function getEventsForDate(dateKey) {
  return eventsData.filter(event => event.date === dateKey);
}

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const label = document.getElementById('calendarMonthLabel');
  if (!grid || !label) return;

  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();

  label.textContent = `${MONTHS_PT[month]} de ${year}`;

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  let cellsHtml = '';

  for (let i = 0; i < firstDayOfMonth; i++) {
    cellsHtml += `<div class="calendar-cell calendar-cell--empty" aria-hidden="true"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDateKey(year, month, day);
    const dayEvents = getEventsForDate(dateKey);
    const hasEvents = dayEvents.length > 0;
    const isToday = dateKey === todayKey;

    cellsHtml += `
      <button type="button"
              class="calendar-cell ${hasEvents ? 'has-events' : ''} ${isToday ? 'is-today' : ''}"
              data-date="${dateKey}"
              aria-label="Dia ${day}${hasEvents ? `, ${dayEvents.length} evento(s)` : ''}">
        <span class="calendar-cell__number">${day}</span>
        ${hasEvents ? '<span class="calendar-cell__dot"></span>' : ''}
      </button>
    `;
  }

  grid.innerHTML = cellsHtml;
  renderMonthEventsList(year, month);
}

function renderMonthEventsList(year, month) {
  const list = document.getElementById('calendarEventsList');
  const heading = document.getElementById('calendarEventsHeading');
  if (!list) return;

  const monthEvents = eventsData
    .filter(event => {
      const eventDate = new Date(event.date + 'T00:00:00');
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (heading) heading.textContent = `Eventos de ${MONTHS_PT[month]}`;

  list.innerHTML = monthEvents.length
    ? monthEvents.map(createEventCard).join('')
    : '<p class="events-empty">Nenhum evento cadastrado para este mês.</p>';

  list.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

function changeCalendarMonth(offset) {
  calendarViewDate.setMonth(calendarViewDate.getMonth() + offset);
  renderCalendar();
}

function initCalendar() {
  const grid = document.getElementById('calendarGrid');
  const prevBtn = document.getElementById('calendarPrev');
  const nextBtn = document.getElementById('calendarNext');
  if (!grid || !prevBtn || !nextBtn) return;

  // Abre já no mês do próximo evento futuro (se houver); senão, mês atual
  const nextEvent = eventsData
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  calendarViewDate = nextEvent ? new Date(nextEvent.date + 'T00:00:00') : new Date();

  prevBtn.addEventListener('click', () => changeCalendarMonth(-1));
  nextBtn.addEventListener('click', () => changeCalendarMonth(1));

  grid.addEventListener('click', (e) => {
    const cell = e.target.closest('.calendar-cell');
    if (!cell || !cell.dataset.date) return;

    const dayEvents = getEventsForDate(cell.dataset.date);
    if (dayEvents.length === 0) return;

    const list = document.getElementById('calendarEventsList');
    if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  renderCalendar();
}