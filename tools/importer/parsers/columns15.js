/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row must be a single cell with the block name
  const rows = [
    ['Columns (columns15)'], // header row, single column
    columns                 // second row, one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
