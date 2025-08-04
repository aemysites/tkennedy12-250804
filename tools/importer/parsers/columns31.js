/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout element containing the columns
  let grid = element.querySelector('.grid-layout');
  if (!grid) {
    // Fallback: check for a child with 'grid' in className
    const divs = element.querySelectorAll(':scope > div');
    for (const d of divs) {
      if (d.classList && Array.from(d.classList).some(c => c.includes('grid'))) {
        grid = d;
        break;
      }
    }
  }
  if (!grid) {
    // If no grid found, do nothing
    return;
  }
  // Get direct column children
  const columns = Array.from(grid.children);
  if (columns.length === 0) {
    // If empty, do nothing
    return;
  }
  // Build the block table with a single-cell header row
  const headerRow = ['Columns (columns31)'];
  const columnsRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  element.replaceWith(table);
}
