/* ==========================
   FORMULÁRIO DE CONTATO
   Usado em: pages/contato.html

   IMPORTANTE: este formulário valida os campos e exibe uma mensagem
   de confirmação, mas AINDA NÃO envia e-mails de verdade, pois o site
   não possui um backend.

   Para ativar o envio real, integre um serviço como:
   - Formspree (https://formspree.io)
   - EmailJS (https://www.emailjs.com)
   - Um backend próprio

   Depois, substitua o conteúdo do bloco "envio real" abaixo.
========================== */

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const feedback = document.getElementById('contactFeedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateRequiredFields(form);

    if (!isValid) {
      feedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
      feedback.className = 'form-feedback form-feedback--error';
      return;
    }

    // ===== ENVIO REAL (pendente de integração) =====
    // Exemplo com Formspree:
    // fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })

    feedback.textContent = 'Mensagem validada com sucesso! (Envio automático ainda será configurado — por enquanto, utilize o WhatsApp para contato imediato.)';
    feedback.className = 'form-feedback form-feedback--success';
    form.reset();
  });
}