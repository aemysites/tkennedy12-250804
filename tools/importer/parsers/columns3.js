/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each is a column)
  const gridChildren = Array.from(grid.children);

  // In this layout, we want to produce a table with 1 header row (single cell),
  // and then a 1-row, N-column row, where N = number of columns in the grid.
  // The example has 2 columns in the second row, matching the HTML.

  const headerRow = ['Columns (columns3)'];
  const columnsRow = gridChildren;

  // Compose the table structure
  const tableData = [headerRow, columnsRow];

  // Create table and replace the original element
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
