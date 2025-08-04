/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (the column content blocks)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row should be a single cell with the block name, per the example
  const headerRow = ['Columns (columns31)'];
  // The content row should have as many cells as columns
  const contentRow = columns;

  // Compose the table data so header is one column, then the content row is multi-column
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
