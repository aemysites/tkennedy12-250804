/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);
  // The header row must match the block name exactly
  const headerRow = ['Columns (columns30)'];

  // The columns row contains each column's element as a table cell
  const columnsRow = columns.map(col => col);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original section with the block table
  element.replaceWith(block);
}
