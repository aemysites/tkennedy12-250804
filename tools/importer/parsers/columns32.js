/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid holding the columns
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;
  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);

  // For this design, the first column is img, the second is a div with all text info
  // Both should be referenced directly so as to retain all content and formatting

  // Table header as per requirements
  const headerRow = ['Columns (columns32)'];

  // Table row: each cell is a column from the grid
  const contentRow = columns.map((col) => col);

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
