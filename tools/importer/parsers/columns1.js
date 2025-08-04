/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid, which correspond to columns
  const columns = Array.from(grid.children);

  // Defensive: Only process if there is at least one column
  if (columns.length < 1) return;

  // The header row must be a single column (single cell)
  const headerRow = ['Columns (columns1)'];

  // The next row contains all columns as separate cells
  const contentRow = columns;

  // Compose the table cells as specified: header is a single cell, content row has N columns
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
