/* global WebImporter */
export default function parse(element, { document }) {
  // The block requires a table with header 'Columns (columns26)' and two columns (side-by-side content).
  // 1st row: header. 2nd row: 2 columns representing left and right content.

  // Find the main grid containing the content blocks
  let container = element.querySelector('.container') || element;
  let grid = container.querySelector('.w-layout-grid.grid-layout:not(.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918)');
  if (!grid) {
    // fallback to any grid-layout
    grid = container.querySelector('.w-layout-grid.grid-layout');
  }
  if (!grid) {
    // fallback to whole element
    grid = container;
  }

  // Get grid's children. Usually 3: heading, quote, and the bottom row grid
  const topLevelChildren = Array.from(grid.children);
  // Get h2 heading (left top)
  const h2 = grid.querySelector('.h2-heading');
  // Get quote (right top)
  const quote = grid.querySelector('.paragraph-lg');

  // Get the 2nd (bottom) row's grid
  let bottomGrid = grid.querySelector('.w-layout-grid.grid-layout.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  // fallback: find nested grid-layout as child of grid
  if (!bottomGrid) {
    bottomGrid = Array.from(grid.querySelectorAll('.w-layout-grid.grid-layout')).find(gr => gr !== grid);
  }

  // From the bottom grid, find the flex row (avatar + name) and the svg/logo
  let avatarRow = null;
  let logoDiv = null;
  if (bottomGrid) {
    avatarRow = bottomGrid.querySelector('.flex-horizontal');
    // Find the div containing svg (logo)
    logoDiv = Array.from(bottomGrid.children).find(div => div.querySelector('svg'));
  }

  // Compose left column: heading (h2), avatarRow (with avatar, name, title)
  const leftCol = [];
  if (h2) leftCol.push(h2);
  if (avatarRow) leftCol.push(avatarRow);

  // Compose right column: quote (p), logoDiv (with svg logo)
  const rightCol = [];
  if (quote) rightCol.push(quote);
  if (logoDiv) rightCol.push(logoDiv);

  // Table header exactly matching spec
  const cells = [
    ['Columns (columns26)'],
    [leftCol, rightCol],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
