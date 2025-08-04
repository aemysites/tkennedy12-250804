/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout, which is the columns container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the column contents)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the cells array: header row is a single cell (block name),
  // then the content row matches the number of columns, each referencing the original DOM element
  const cells = [
    ['Columns (columns14)'], // Header row, single column
    columns // Second row, one cell per column
  ];

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
