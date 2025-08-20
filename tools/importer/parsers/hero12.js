/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example
  const headerRow = ['Hero (hero12)'];

  // Get direct grid children
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');

  // --- 2nd row: Background image ---
  // Find the first direct img (background)
  let bgImg = null;
  if (gridDivs.length > 0) {
    const possibleImg = gridDivs[0].querySelector('img');
    if (possibleImg) {
      bgImg = possibleImg;
    }
  }

  // --- 3rd row: Content block ---
  // Find the content container
  let contentBlock = null;
  if (gridDivs.length > 1) {
    // Content with headline, subtext, CTA etc. is inside this container
    // This may include grid, card, and card-body classes
    // Retain full card structure for resilience
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      contentBlock = card;
    } else {
      // fallback, if no .card found
      contentBlock = gridDivs[1];
    }
  }

  // table structure as per example: 1 column, 3 rows
  const cells = [
    headerRow,
    [bgImg],
    [contentBlock]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
