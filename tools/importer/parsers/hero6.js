/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Hero (hero6)'];

  // --- Extract background image ---
  // The image is in the first column of the grid-layout
  let img = null;
  const grid = element.querySelector(':scope > .w-layout-grid.grid-layout');
  if (grid && grid.children.length > 0) {
    const left = grid.children[0];
    img = left.querySelector('img');
  }
  const imgRow = [img ? img : ''];

  // --- Extract hero content (heading, subheading, CTAs) ---
  let contentArray = [];
  if (grid && grid.children.length > 1) {
    const right = grid.children[1];
    // Look for grid inside right
    const innerGrid = right.querySelector(':scope > .w-layout-grid');
    if (innerGrid) {
      // Card wrapper
      const card = innerGrid.querySelector(':scope > .card');
      if (card) {
        // Heading
        const h1 = card.querySelector('h1');
        if (h1) contentArray.push(h1);
        // Subheading (assume <p class="subheading">)
        const subheading = card.querySelector('p.subheading');
        if (subheading) contentArray.push(subheading);
        // Button group (may contain 0, 1, or 2 links)
        const buttonGroup = card.querySelector('.button-group');
        if (buttonGroup) contentArray.push(buttonGroup);
      }
    }
  }
  const contentRow = [contentArray.length ? contentArray : ''];

  // Compose cells
  const cells = [headerRow, imgRow, contentRow];

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
