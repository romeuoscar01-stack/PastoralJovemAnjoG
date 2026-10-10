/* ==========================
   ARQUIVO PRINCIPAL
   Inicializa todos os módulos do site.

   IMPORTANTE: nem toda página carrega todos os arquivos JS
   (ex: calendar.js só existe em pages/calendario.html).
   Por isso, cada função só é chamada se "typeof nomeDaFuncao"
   for verificado na MESMA linha em que a função é referenciada.
   Isso evita ReferenceError quando o arquivo correspondente
   não foi incluído na página atual.
========================== */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initMenu === 'function') safeRun(initMenu, 'initMenu');
  if (typeof initHeaderScroll === 'function') safeRun(initHeaderScroll, 'initHeaderScroll');
  if (typeof renderEvents === 'function') safeRun(renderEvents, 'renderEvents');
  if (typeof initEventsFilters === 'function') safeRun(initEventsFilters, 'initEventsFilters');
  if (typeof renderGallery === 'function') safeRun(renderGallery, 'renderGallery');
  if (typeof initGalleryFilters === 'function') safeRun(initGalleryFilters, 'initGalleryFilters');
  if (typeof initLightbox === 'function') safeRun(initLightbox, 'initLightbox');
  if (typeof initNewsFilters === 'function') safeRun(initNewsFilters, 'initNewsFilters');
  if (typeof renderSingleNews === 'function') safeRun(renderSingleNews, 'renderSingleNews');
  if (typeof initContactForm === 'function') safeRun(initContactForm, 'initContactForm');
  if (typeof initParticipateForm === 'function') safeRun(initParticipateForm, 'initParticipateForm');
  if (typeof initCalendar === 'function') safeRun(initCalendar, 'initCalendar');
  if (typeof initScrollReveal === 'function') safeRun(initScrollReveal, 'initScrollReveal');
  safeRun(setCurrentYear, 'setCurrentYear');
});

/* ==========================
   Executa uma função com segurança:
   se ela existir mas der erro ao rodar, registra no console
   sem travar a execução das demais funções.
========================== */
function safeRun(fn, name) {
  try {
    fn();
  } catch (error) {
    console.error(`[PJAG] Erro ao executar "${name}":`, error);
  }
}

function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==========================
   VALIDAÇÃO DE FORMULÁRIOS
   Função genérica reutilizada por js/contact.js e js/participate.js
========================== */
function validateRequiredFields(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('has-error');
      isValid = false;
    } else {
      field.classList.remove('has-error');
    }
  });

  return isValid;
}