/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get image or video-poster
  function getImage(cardElem) {
    // Try image
    let img = cardElem.querySelector('img');
    if (img) return img;
    // Try picture
    const picture = cardElem.querySelector('picture');
    if (picture) return picture;
    // Try video poster image
    const poster = cardElem.querySelector('.vjs-poster img');
    if (poster) return poster;
    return '';
  }
  // Helper to get text block for card
  function getText(cardElem) {
    // Prefer .text-component (contains all text)
    const textComponent = cardElem.querySelector('.text-component');
    if (textComponent) return textComponent;
    // Or description for video
    const description = cardElem.querySelector('.videojs-description .desc-width');
    if (description) return description;
    // Otherwise, gather h3, p, and a in order
    const items = [];
    cardElem.querySelectorAll('h3, p, a').forEach(n => items.push(n));
    if (items.length) return items;
    // Fallback: all text inside
    return cardElem;
  }
  // Find all cards (columns)
  let cards = [];
  const colControl = element.classList.contains('columnControl') ? element : element.querySelector('.columnControl');
  if (colControl) {
    const cols = colControl.querySelectorAll('.pwccol3-longform > div');
    if (cols.length) {
      cards = Array.from(cols);
    } else {
      cards = Array.from(colControl.children);
    }
  } else {
    cards = [element];
  }
  // Build rows: header then one per card
  const rows = [['Cards (cards6)']];
  cards.forEach(cardElem => {
    // Try to find .cmp-container inside the card column, else the column itself
    const cmp = cardElem.querySelector('.cmp-container') || cardElem;
    // Get image
    const img = getImage(cmp);
    // Get text block
    let text = getText(cmp);
    // If text is an array, use as-is; else wrap
    if (!Array.isArray(text)) text = [text];
    // Remove empty nodes
    text = text.filter(n => {
      if (typeof n === 'string') return n.trim() !== '';
      if (n.nodeType === 3) return n.textContent.trim() !== '';
      if (n.nodeType === 1) return n.textContent.trim() !== '' || n.tagName === 'A';
      return false;
    });
    rows.push([
      img ? img : '',
      text.length === 1 ? text[0] : text,
    ]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}