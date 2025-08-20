/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid container with the two columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get direct children of the grid (columns)
  const columns = Array.from(grid.children);
  // Find image and text columns
  const imageCol = columns.find(el => el.tagName === 'IMG');
  const textCol = columns.find(el => el !== imageCol);

  // For imageCol, use the image element directly
  // For textCol, use the entire container (all content)

  const headerRow = ['Columns (columns32)'];
  const contentRow = [imageCol, textCol];

  // Only one table, no Section Metadata block needed
  // All text and visual elements are referenced, nothing is hardcoded

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
