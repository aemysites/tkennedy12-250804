/* global WebImporter */
export default function parse(element, { document }) {
  // Create array of table rows, beginning with the header
  const rows = [['Cards']];

  // Select all immediate card divs
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((card) => {
    // Each card contains an icon (svg) and a p with text. Only use the <p>.
    const p = card.querySelector('p');
    if (p) {
      rows.push([p]); // Reference the existing paragraph element directly
    }
  });

  // Build table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
