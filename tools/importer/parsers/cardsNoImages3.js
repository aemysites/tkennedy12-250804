/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table header as in the example
  const cells = [['Cards (cardsNoImages3)']];

  // Locate container for cards: prefer .cmp-container, but fallback to element
  const cardContainer = element.querySelector('.cmp-container') || element;

  // Try to get all card blocks as direct children (for resilience)
  let cardSections = Array.from(cardContainer.querySelectorAll(':scope > .text.parbase.section'));
  // If not found, fallback to all .text.parbase.section descendants
  if (cardSections.length === 0) {
    cardSections = Array.from(cardContainer.querySelectorAll('.text.parbase.section'));
  }

  cardSections.forEach((section) => {
    // The card content is in .text-component, but fallback to section if missing
    const textComp = section.querySelector('.text-component') || section;
    // Gather all relevant nodes (keep structure, preserve semantics)
    const cardContent = [];
    Array.from(textComp.childNodes).forEach((node) => {
      // Only add non-empty elements and non-empty text
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Avoid empty divs (eg. first divs)
        if (node.tagName === 'DIV' && node.textContent.trim() === '') return;
        cardContent.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        // Wrap loose text nodes in a <span> so they're not lost
        const span = document.createElement('span');
        span.textContent = node.textContent;
        cardContent.push(span);
      }
    });
    if (cardContent.length) {
      cells.push([cardContent]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
