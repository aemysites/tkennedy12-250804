/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the footer
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Extract the columns (each direct child of the grid)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row should be a single cell exactly matching the block name
  const headerRow = ['Columns (columns9)'];

  // The content row should contain as many cells as there are columns
  const contentRow = columns;

  // Construct the block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(blockTable);
}
