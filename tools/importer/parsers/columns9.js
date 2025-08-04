/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Correct: header row is single cell (one column)
  const cells = [
    ['Columns (columns9)'],
    columns // one array = one row, items in array = columns in that row
  ];

  // Create the block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
