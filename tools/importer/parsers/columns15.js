/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the columns grid that holds the content for the block
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid - each is a column cell
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Compose the table cells per requirements
  const headerText = 'Columns (columns15)'; // Must match example exactly
  const cells = [
    [headerText], // Header row: exactly one cell
    columns      // Content row: one cell per column
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set colspan for the header to match number of columns in the content row
  const headerRow = table.querySelector('tr');
  if (headerRow && headerRow.children.length === 1) {
    headerRow.children[0].setAttribute('colspan', String(columns.length));
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
