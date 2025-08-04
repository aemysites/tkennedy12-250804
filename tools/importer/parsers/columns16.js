/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate grid children (each is a column block)
  const columnDivs = Array.from(grid.children);

  // For each column, extract *all* its visible content (not just images)
  // Most columns have one direct content child, but could vary, so collect all children
  const columnCells = columnDivs.map(col => {
    // Get all nodes inside this column (usually a single div, but could be more)
    const contentChildren = Array.from(col.children);
    if (contentChildren.length === 1) {
      // If only one child, return it directly for resilience
      return contentChildren[0];
    } else if (contentChildren.length > 1) {
      // If multiple children, return all as an array
      return contentChildren;
    } else {
      // If there are no children, fallback to the column itself
      return col;
    }
  });

  // Header as a single column (matches example)
  const headerRow = ['Columns (columns16)'];
  // Second row: as many columns as there are columns in the source grid
  const contentRow = columnCells;
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
