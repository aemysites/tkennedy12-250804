/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 2. Extract the direct children of the grid (each column)
  const cols = Array.from(grid.children);

  // Edge-case: If there are fewer than 2 columns, skip
  if (cols.length < 2) return;

  // 3. Create the header row as specified
  const headerRow = ['Columns (columns3)'];

  // 4. Compose the columns row (reference the actual column elements)
  // This preserves all nested markup, headings, buttons, etc.
  const columnsRow = cols.map(col => col);

  // 5. Create the block table structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // 6. Replace the original section element with the table
  element.replaceWith(table);
}
