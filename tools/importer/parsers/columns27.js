/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the direct grid children for the columns
  const columns = Array.from(grid.children);
  // Defensive: skip empty columns (shouldn't happen for valid blocks)
  if (columns.length < 2) return;
  // Create header row
  const headerRow = ['Columns (columns27)'];
  // Create content row: reference *existing* elements, not their HTML or clones
  const contentRow = [columns[0], columns[1]];
  // Compose the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the entire section element with the new table
  element.replaceWith(table);
}
