/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children (columns) of the grid
  const columns = Array.from(grid.children);
  const colCount = columns.length;

  // Header row must be a single cell, regardless of column count
  const headerRow = ['Columns (columns35)'];

  // Content row: one cell per column in the grid
  const contentRow = columns;

  // Assemble the rows for the block table
  const rows = [headerRow, contentRow];
  
  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(table);
}
