/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  let grid = element.querySelector('.grid-layout');
  if (!grid) {
    // fallback: take the first direct child div with >1 children
    grid = Array.from(element.children).find((el) => el.tagName === 'DIV' && el.children.length > 1);
  }
  if (!grid) {
    // If still not found, fallback to the element itself
    grid = element;
  }

  // Get the immediate children of the grid as columns
  const columns = Array.from(grid.children).filter(col => {
    // Consider a column non-empty if it has visible text or elements
    return !!col.textContent.trim() || col.querySelector('*');
  });

  // Table header row - exactly one cell
  const headerRow = ['Columns (columns31)'];

  // Table columns row: each cell is the referenced existing column div
  const columnsRow = columns.map(col => col);

  // Compose table data: header is a single cell, then the content row
  const cells = [
    headerRow,
    columnsRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
