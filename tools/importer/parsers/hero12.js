/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches exactly to the example
  const headerRow = ['Hero (hero12)'];

  // Find the background image: first .cover-image in the first grid cell
  let backgroundImg = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 0) {
      backgroundImg = gridChildren[0].querySelector('img.cover-image') || null;
    }
  }
  // Row for background image (may be null)
  const bgRow = [backgroundImg];

  // Find the content cell: card-body (text, icons, ctas)
  let contentCell = null;
  if (grid && grid.children.length > 1) {
    // Second grid child contains the card
    const cardContainer = grid.children[1];
    // The card-body contains all text & buttons
    const cardBody = cardContainer.querySelector('.card-body');
    if (cardBody) {
      contentCell = cardBody;
    } else {
      // fallback: use the cardContainer itself
      contentCell = cardContainer;
    }
  }
  const contentRow = [contentCell];

  // Compose the block table
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
