/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the footer columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all top-level columns (the immediate children of the grid)
  const columns = Array.from(grid.children);

  // Build the table cells: header row and content row
  // The header must be exactly 'Columns (columns9)' per the example
  const cells = [
    ['Columns (columns9)'],
    columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured table
  element.replaceWith(table);
}
