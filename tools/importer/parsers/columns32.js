/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid
  const columns = Array.from(grid.children);

  // Expecting two columns: first is image, second is content block
  // Find image (should be direct img), and content (div)
  let imgCol = null;
  let contentCol = null;

  columns.forEach(child => {
    if (!imgCol && child.tagName === 'IMG') imgCol = child;
    if (!contentCol && child.tagName === 'DIV') contentCol = child;
  });

  // Fallback: try to find image and content
  if (!imgCol) imgCol = grid.querySelector('img');
  if (!contentCol) {
    contentCol = columns.find(child => child !== imgCol);
    if (!contentCol) contentCol = grid.querySelector('div');
  }

  // Use the original elements directly (do not clone)
  const headerRow = ['Columns (columns32)'];
  const dataRow = [imgCol, contentCol];

  // Only include not-null columns
  const cleanRow = dataRow.map(col => col || '');

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cleanRow
  ], document);

  element.replaceWith(table);
}
