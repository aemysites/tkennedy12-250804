/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid (the columns)
  const columns = Array.from(grid.children);
  // The markup gives us 4 columns:
  // 0: Taylor Brooks (div)
  // 1: tags (div)   2: heading (h2)   3: paragraphs (div.rich-text)
  // The tags and heading belong together as one column visually

  // Left column: Taylor Brooks
  const leftCol = columns[0];
  // Middle column: tags + heading (put both together in a container)
  const middleCol = document.createElement('div');
  if (columns[1]) middleCol.appendChild(columns[1]);
  if (columns[2]) middleCol.appendChild(columns[2]);
  // Right column: paragraphs
  const rightCol = columns[3];

  // Build the header and content rows
  const headerRow = ['Columns (columns30)', '', ''];
  const columnsRow = [leftCol, middleCol, rightCol];

  // Build the cells array
  const cells = [headerRow, columnsRow];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
