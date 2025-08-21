/* global WebImporter */
export default function parse(element, { document }) {
  // Find direct column containers
  const columns = element.querySelectorAll(':scope > .parsys_column');
  if (columns.length < 2) return;

  // Helper to get the main content element from a column
  function getColumnContent(col) {
    // Prefer the inner '.cmp-container' if present
    const container = col.querySelector(':scope > .cmp-container');
    if (container) return container;
    return col;
  }

  const col1 = getColumnContent(columns[0]);
  const col2 = getColumnContent(columns[1]);

  // Build the table rows as per the block spec
  // Header row: single cell with block name
  const headerRow = ['Columns (columns21)'];
  // Columns row: array with both columns as one row
  const columnsRow = [col1, col2];

  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
