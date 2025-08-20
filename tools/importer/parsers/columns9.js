/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing all the columns
  let grid = element.querySelector('.grid-layout');
  if (!grid) {
    // fallback: get the first div inside container
    const container = element.querySelector('.container');
    grid = container ? container.querySelector('div') : null;
  }
  if (!grid) {
    // fallback: use all direct child lists if grid not found
    grid = element;
  }

  // Get all direct children that are columns: either 'div' or 'ul' (3 categories + 1 logo/social)
  const columns = Array.from(grid.children);

  // Header row exactly as required
  const headerRow = ['Columns (columns9)'];

  // Second row: each column's entire block goes in one cell
  const dataRow = columns.map(col => col);

  // Only one table block to be created, as in the example
  const cells = [headerRow, dataRow];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
