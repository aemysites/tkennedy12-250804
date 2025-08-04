/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // If there are no columns, do nothing
  if (columns.length === 0) return;

  // The header row must be exactly one cell
  const headerRow = ['Columns (columns38)'];

  // The second row should have as many cells as columns
  const contentRow = columns;

  // Build the table: header is a single cell, second row is N cells
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
