/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example exactly
  const headerRow = ['Hero (hero39)'];

  // 2. Extract the background image (if present)
  // Structure: outer header > .w-layout-grid > [image div, content div]
  const grid = element.querySelector(':scope > .w-layout-grid');
  let imageCell = '';
  if (grid && grid.children.length > 0) {
    // The background image is in the first grid child as an <img>
    const imgDiv = grid.children[0];
    const img = imgDiv.querySelector('img');
    if (img) imageCell = img;
  }

  // 3. Extract the main content: headline, subheading, cta, etc.
  let contentCell = '';
  if (grid && grid.children.length > 1) {
    // The content is in the second grid child
    const contentDiv = grid.children[1];
    // Reference the existing element directly, per spec
    contentCell = contentDiv;
  }

  // 4. Compose the block table
  const cells = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
