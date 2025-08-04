/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout block containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate columns (often two: one text, one image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Reference the actual content blocks
  const firstCol = columns[0];
  const secondCol = columns[1];

  // Table header as per specification
  const headerRow = ['Columns (columns27)'];

  // Organize table rows: block name header, then two columns
  const contentRow = [firstCol, secondCol];

  // Use createTable to make the block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element in-place
  element.replaceWith(table);
}
