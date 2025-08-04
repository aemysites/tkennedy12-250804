/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid, which are the columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header row exactly as required
  const headerRow = ['Columns (columns1)'];

  // Each cell should reference the actual element nodes, not their innerHTML
  // This will make the first column the image, second column the text block
  const col1 = columns[0]; // img
  const col2 = columns[1]; // text content (heading, subheading, buttons)

  // Build the table structure
  const cells = [
    headerRow,
    [col1, col2]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
