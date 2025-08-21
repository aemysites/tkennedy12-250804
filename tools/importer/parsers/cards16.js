/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get one card's parts given the start of a card group
  function getCardsFromContainer(root) {
    const cards = [];
    let node = root.firstElementChild;
    while (node) {
      if (node.classList.contains('coe-article')) {
        const card = { articleBtn: node };
        node = node.nextElementSibling;
        if (node && node.classList.contains('coe-article-close')) {
          card.articleClose = node;
          node = node.nextElementSibling;
        }
        if (node && node.classList.contains('coe-article-company')) {
          card.company = node;
          node = node.nextElementSibling;
        }
        if (node && node.classList.contains('coe-article-content-body')) {
          card.contentBody = node;
          node = node.nextElementSibling;
        }
        if (node && node.classList.contains('coe-article-controls')) {
          card.controls = node;
          node = node.nextElementSibling;
        }
        cards.push(card);
      } else {
        node = node.nextElementSibling;
      }
    }
    return cards;
  }

  // Parse a single card
  function parseCard(card) {
    // --- Image (first column) ---
    let imgEl = null;
    const imgDiv = card.articleBtn.querySelector('.coe-article-image');
    if (imgDiv && imgDiv.style.backgroundImage) {
      const urlMatch = imgDiv.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (urlMatch) {
        imgEl = document.createElement('img');
        imgEl.src = urlMatch[1];
        imgEl.alt = '';
      }
    }
    // --- Text column (second column) ---
    const textEls = [];
    // Title: company name as <strong>
    if (card.company) {
      const title = document.createElement('strong');
      title.textContent = card.company.textContent.trim();
      textEls.push(title);
    }
    // Subtitle: location under title
    const subLoc = card.articleBtn.querySelector('.coe-article-location');
    if (subLoc) {
      const subtitle = document.createElement('div');
      subtitle.textContent = subLoc.textContent.trim();
      subtitle.style.fontWeight = 'normal';
      subtitle.style.fontSize = 'smaller';
      textEls.push(subtitle);
    }
    // Description/body
    if (card.contentBody) {
      // Use only the childNodes for semantic preservation
      Array.from(card.contentBody.childNodes).forEach(n => {
        // Remove 'Core focus areas' paragraphs and empty nodes
        if (n.nodeType === 1 && n.tagName === 'P' && /core focus areas/i.test(n.textContent)) return;
        if (n.nodeType === 3 && !n.textContent.trim()) return;
        textEls.push(n);
      });
    }
    // CTA link
    let cta = null;
    if (card.controls) {
      const ctaLink = card.controls.querySelector('a');
      if (ctaLink) {
        textEls.push(ctaLink);
      }
    }
    return [imgEl, textEls];
  }

  const headerRow = ['Cards (cards16)'];
  const cardObjs = getCardsFromContainer(element);
  const tableRows = [headerRow];
  cardObjs.forEach(card => {
    const [img, textContent] = parseCard(card);
    tableRows.push([img, textContent]);
  });

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
