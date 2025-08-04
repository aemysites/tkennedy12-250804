/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Header row: only one cell, must span all columns
  // WebImporter.DOMUtils.createTable interprets a single-cell header row as spanning all columns
  const headerRow = ['Columns (columns38)'];
  // Content row: each column is a cell
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}