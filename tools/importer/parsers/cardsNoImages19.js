/* global WebImporter */
export default function parse(element, { document }) {
  // The block header
  const rows = [['Cards']];

  // Each card is a direct child <div> of the block
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  cards.forEach(card => {
    // Each card has a <p> containing the card text; keep semantic meaning (as a paragraph)
    const p = card.querySelector('p');
    if (p) {
      // Reference the existing <p> element for resilience
      rows.push([p]);
    }
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
