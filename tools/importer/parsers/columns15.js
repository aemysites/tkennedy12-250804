/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout that contains the columns
  let container = element.querySelector('.container');
  if (!container) container = element;
  let mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) mainGrid = container.querySelector('[class*="grid-layout"]');
  if (!mainGrid) return;

  // Gather all direct children of the grid: these are the columns in the first 'row'
  const columns = Array.from(mainGrid.children);
  if (!columns.length) return;

  // HEADER ROW: exactly one cell, as per the example markdown structure
  const headerRow = ['Columns (columns15)'];

  // The content row has as many columns as .grid-layout children
  const contentRow = columns.map(col => col);

  // Assemble cells array accordingly
  const cells = [headerRow, contentRow];

  // Create block and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
