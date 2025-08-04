/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero12)'];

  // Find the main grid (should contain two main children: bg image and content)
  const grid = element.querySelector('.w-layout-grid.grid-layout');

  // Row 2: Background image (first immediate child of grid with an img)
  let bgImg = '';
  if (grid && grid.children.length > 0) {
    const imgDiv = grid.children[0];
    const img = imgDiv.querySelector('img');
    if (img) bgImg = img;
  }

  // Row 3: Foreground content (headline, subheading, cta)
  // This is the entire content area/card, reference the main card body
  let contentCell = '';
  if (grid && grid.children.length > 1) {
    const containerDiv = grid.children[1];
    // The main content is within .card-body, but we want all content in that column
    const card = containerDiv.querySelector('.card');
    if (card) {
      // Reference the .card-body (guaranteed to contain all relevant content, including heading, list, cta)
      const cardBody = card.querySelector('.card-body');
      if (cardBody) contentCell = cardBody;
      else contentCell = card; // fallback
    } else {
      // fallback: use the containerDiv itself
      contentCell = containerDiv;
    }
  }

  const cells = [
    headerRow,
    [bgImg],
    [contentCell]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
