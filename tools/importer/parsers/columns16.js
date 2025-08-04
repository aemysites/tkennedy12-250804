/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout div, which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each direct child of .grid-layout is a column
  const columnDivs = Array.from(grid.children);
  // For each column, use its full content (not just the image), preserving any content structure
  const columns = columnDivs.map(col => col);

  // Compose table: first row is single-cell header, second row is all columns
  const headerRow = ['Columns (columns16)']; // exactly one cell in the header row
  const contentRow = columns; // as many columns as found
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
