/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  
  // Get the direct children (the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header matches example: Columns (columns3)
  const headerRow = ['Columns (columns3)'];
  // Use all top-level columns in the content row
  const contentRow = columns;
  
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
