/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get direct grid children as columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;
  
  // The header row must be a single cell with the block name, per spec
  const headerRow = ['Columns (columns30)'];
  // The next row contains one cell for each column
  const contentRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
