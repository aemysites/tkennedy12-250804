/* global WebImporter */
export default function parse(element, { document }) {
  // Header row is exactly one cell
  const headerRow = ['Columns (columns14)'];

  // Find the inner grid layout (the grid contains columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get immediate children of grid (these are the columns for the block)
  const gridColumns = Array.from(grid.children);

  // Filter out empty or non-element nodes, just in case
  const columns = gridColumns.filter((col) => {
    if (col.nodeType !== 1) return false;
    if (col.textContent.trim() === '' && !col.querySelector('img,svg,video,iframe,audio')) return false;
    return true;
  });

  // Compose the table rows
  // Header is ALWAYS a single cell (matches example)
  // Content row has as many cells as columns detected
  const tableData = [
    headerRow,
    columns
  ];

  // Use createTable to build the table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix: set colspan on header cell so it matches number of columns in content row
  if (block && block.rows && block.rows.length > 1 && block.rows[0].cells.length === 1) {
    block.rows[0].cells[0].setAttribute('colspan', columns.length);
  }

  element.replaceWith(block);
}
