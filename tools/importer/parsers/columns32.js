/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the direct children (columns) of the grid
  const columns = Array.from(grid.children);
  // We expect 2 columns: image, content
  if (columns.length < 2) return;

  // Reference the existing image element (first column)
  const imageEl = columns[0];
  // Reference the content block (second column)
  const contentEl = columns[1];

  // Structure: header, then one row with both columns
  const headerRow = ['Columns (columns32)'];
  const contentRow = [imageEl, contentEl];
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
