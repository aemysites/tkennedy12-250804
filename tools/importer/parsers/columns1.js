/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column grid (the multi-column layout)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (these are the columns)
  // In the provided HTML: [img, content div]
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header row - must exactly match the block name
  const headerRow = ['Columns (columns1)'];
  // Table content row - the image column and the content column
  const contentRow = [columns[0], columns[1]];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table block
  element.replaceWith(block);
}
