/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child grid
  const grid = element.querySelector(':scope > .w-layout-grid, :scope > div.w-layout-grid');
  if (!grid) return;

  // Get the two main columns of the feature grid
  const [bgContainer, contentContainer] = Array.from(grid.children);

  // Row 1: Header
  const headerRow = ['Hero (hero12)'];

  // Row 2: Background image (optional)
  let bgImg = null;
  if (bgContainer) {
    bgImg = bgContainer.querySelector('img');
  }
  const bgImgRow = [bgImg].filter(Boolean);

  // Row 3: Hero content (headline, subhead, CTA, etc)
  // The relevant content is nested inside .card-body in the 2nd grid cell
  let cardBody = null;
  if (contentContainer) {
    const card = contentContainer.querySelector('.card-body');
    if (card) {
      cardBody = card;
    }
  }
  const contentRow = [cardBody].filter(Boolean);

  // Compose the table rows
  const rows = [
    headerRow,
    ...(bgImgRow.length ? [bgImgRow] : []),
    ...(contentRow.length ? [contentRow] : [])
  ];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
