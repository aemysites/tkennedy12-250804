/* global WebImporter */
export default function parse(element, { document }) {
  // The header row is always a single cell
  const headerRow = ['Columns (columns7)'];

  // Get all direct child divs (columns)
  const columns = element.querySelectorAll(':scope > div');
  // The second row contains all columns as cells
  const contentRow = Array.from(columns);

  // Compose the table data
  const tableData = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
