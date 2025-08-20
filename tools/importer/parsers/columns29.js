/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns) of the grid
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const colCount = columns.length || 1;
  // Build the header row: block name in first cell, rest empty, must match number of columns
  const headerRow = ['Columns (columns29)'];
  while (headerRow.length < colCount) {
    headerRow.push('');
  }
  // For each column, reference the original div
  const cellsRow = columns.map((col) => col);
  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);
  // Replace the original element
  element.replaceWith(table);
}
