/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with columns as immediate children
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children as columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row: same number of cells as columns, first is block name, rest empty
  const headerRow = ['Columns (columns31)', ...Array(columns.length - 1).fill('')];

  // Content row: each column is a cell
  const contentRow = columns;

  // Create table block
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element with the block
  element.replaceWith(block);
}
