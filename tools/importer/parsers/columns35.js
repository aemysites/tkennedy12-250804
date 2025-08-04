/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get direct children of the grid (each column)
  const columns = Array.from(grid.children);
  const colCount = columns.length;
  if (colCount === 0) return;

  // The header row must be a single cell, even though there are multiple columns
  const headerRow = ['Columns (columns35)'];
  // The content row has one cell for each column
  const contentRow = columns;
  
  // Compose block table data
  const table = [headerRow, contentRow];
  
  // Create table and fix colspan for header
  const block = WebImporter.DOMUtils.createTable(table, document);
  // Set colspan on the header cell so it spans all columns
  const th = block.querySelector('th');
  if (th && colCount > 1) {
    th.setAttribute('colspan', colCount);
  }

  element.replaceWith(block);
}
