# PJAG — Pastoral Jovem Anjo da Guarda

Site institucional da Pastoral Jovem Anjo da Guarda (PJAG).

## 📁 Estrutura do projeto

- `index.html` → Página inicial
- `pages/` → Páginas internas (sobre, eventos, galeria, notícias, contato, participar) — **em desenvolvimento**
- `css/` → Estilos separados por responsabilidade
- `js/` → Scripts separados por funcionalidade
- `assets/images` → Fotos do site
- `assets/icons` → Ícones e favicon
- `assets/logos` → Logo da PJAG
- `assets/videos` → Vídeos (hero, depoimentos, etc.)

## ✏️ Como alterar textos

Os textos ficam diretamente no `index.html`. Procure pelo texto entre colchetes, como `[NOME DA PARÓQUIA]`, e substitua pela informação real.

## 📅 Como adicionar um evento

Edite `js/events.js` e adicione um novo objeto no array `eventsData`:

```js
{
  id: 4,
  title: 'Nome do evento',
  date: '2025-06-10',
  time: '19h00',
  location: 'Local do evento',
  category: 'Encontro',
  description: 'Descrição breve do evento.',
  status: 'upcoming'
}