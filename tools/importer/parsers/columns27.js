/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the column content
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  let colItems = [];

  if (grid) {
    // Get immediate children (divs/images) for columns
    colItems = Array.from(grid.children);
  } else {
    // fallback: try to get from container, or section directly
    const container = element.querySelector('.container');
    if (container) {
      colItems = Array.from(container.children);
    } else {
      colItems = Array.from(element.children);
    }
  }

  // Defensive: filter out empty text nodes or nodes with no actual content
  colItems = colItems.filter(node => {
    if (node.nodeType !== 1) return false; // element only
    if (node.tagName === 'DIV' && !node.textContent.trim() && !node.querySelector('img, picture')) return false;
    if (node.tagName === 'IMG' && !node.src) return false;
    return true;
  });

  // The example expects two columns: content and image.
  // If there are more than two, only use the first two.
  const contentCells = colItems.slice(0, 2);

  // Table header as required in guidelines and per example
  const headerRow = ['Columns (columns27)'];

  // Compose the table with header and one row of two columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentCells
  ], document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}
