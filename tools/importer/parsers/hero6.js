/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as specified
  const headerRow = ['Hero (hero6)'];

  // --- 2nd row: Background Image ---
  // Find the first <img> (background image)
  const bgImg = element.querySelector('img');
  const imgRow = [bgImg || ''];

  // --- 3rd row: Text (headline, subheading, CTA) ---
  // The box with all the text/buttons is in a div.card
  const card = element.querySelector('.card');
  const contentRow = [card || ''];

  // Compose the table using the exact structure in the reference
  const cells = [
    headerRow,
    imgRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
