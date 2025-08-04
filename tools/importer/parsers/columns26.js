/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure element exists
  if (!element) return;

  // The block name EXACTLY as the example
  const headerRow = ['Columns (columns26)'];

  // Find the grid that contains the columns (there may be multiple nested grids)
  const container = element.querySelector('.container');
  if (!container) return;

  const topGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!topGrid) return;

  // Get all direct children (these are the columns)
  // In this HTML: [p.h2-heading, p.paragraph-lg, nested .w-layout-grid (bottom row)]
  const gridChildren = Array.from(topGrid.children);
  if (gridChildren.length < 3) return;

  // Column 1: Heading + Paragraph (left side)
  const leftColEls = [gridChildren[0], gridChildren[1]];
  
  // Column 2: Nested grid containing divider, avatar+name, logo (right side)
  const rightColGrid = gridChildren[2];
  // We use the whole element for robustness
  const rightColEls = [rightColGrid];

  // Structure: one row of 2 columns
  const blockRows = [headerRow, [leftColEls, rightColEls]];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(blockRows, document);
  
  // Replace the original element with the new block
  element.replaceWith(table);
}
