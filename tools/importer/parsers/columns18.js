/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid, in order
  const gridChildren = Array.from(grid.children);

  // We'll assemble up to 3 columns, matching the layout visually:
  // - Text/Heading content (left)
  // - Contact methods (middle/right)
  // - Main image (bottom/rightmost)

  let col1 = null, col2 = null, col3 = null;

  // Assign by tag and order, since structure is consistent for this block:
  // 1. div (with headings and subheading)
  // 2. ul (contact methods)
  // 3. img (main image)
  for (const child of gridChildren) {
    if (!col1 && child.tagName === 'DIV') {
      col1 = child;
    } else if (!col2 && child.tagName === 'UL') {
      col2 = child;
    } else if (!col3 && child.tagName === 'IMG') {
      col3 = child;
    }
  }

  // Only build the table if all columns found
  if (!(col1 && col2 && col3)) return;

  // Table header must be exactly as specified
  const headerRow = ['Columns (columns18)'];
  // Table row: each column as a cell
  const columnsRow = [col1, col2, col3];

  // Build the table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(block);
}
