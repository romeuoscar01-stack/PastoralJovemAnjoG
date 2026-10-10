/* ==========================
   FORMULÁRIO "QUERO FAZER PARTE"
   Usado em: pages/participar.html

   Não depende de backend: monta uma mensagem a partir dos dados
   preenchidos e abre o WhatsApp da pastoral com o texto pronto.
========================== */

function initParticipateForm() {
  const form = document.getElementById('participateForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateRequiredFields(form);
    if (!isValid) return;

    const name = form.querySelector('#participateName').value.trim();
    const age = form.querySelector('#participateAge').value.trim();

    const message = `Olá! Me chamo ${name}${age ? ', tenho ' + age + ' anos' : ''} e gostaria de fazer parte da PJAG.`;

    // Substitua [WHATSAPP] pelo número real no formato internacional, ex: 5511999999999
    const whatsappNumber = '[WHATSAPP]';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener');
    form.reset();
  });
}