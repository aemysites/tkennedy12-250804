/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns (children as columns)
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;
  
  // The columns14 pattern is: each direct child of grid is a column block
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Compose header row: must be a single-cell row containing only the block name
  const headerRow = ['Columns (columns14)'];

  // Compose the data row: one cell per column (each cell contains one column block)
  const dataRow = columns.map(col => col);

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // single cell (spans columns)
    dataRow    // as many cells as columns
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
