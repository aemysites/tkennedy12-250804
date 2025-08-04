/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have exactly one column
  const headerRow = ['Cards (cards17)'];
  const cardRows = [];
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Each card is a row with exactly two columns: image, then text content (if any)
    // Here, since there is no text content, we must include an empty string for the second cell to preserve structure
    cardRows.push([img, '']);
  });
  // Assemble all rows, header first
  const rows = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}