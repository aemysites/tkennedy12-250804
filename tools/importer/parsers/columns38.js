/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: exactly one column containing the block name
  const headerRow = ['Columns (columns38)'];

  // Second row: one cell per column
  const contentRow = columns;

  // Compose the cells array
  const cells = [headerRow, contentRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
