/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that represents the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare the three columns for the content row
  // Col 1: Name (Taylor Brooks)
  const col1 = columns[0] || '';

  // Col 2: Tags block
  const col2 = columns[1] || '';

  // Col 3: Heading + rich text description (combine columns[2] and [3])
  let col3;
  if (columns[2] && columns[3]) {
    const frag = document.createDocumentFragment();
    frag.appendChild(columns[2]);
    frag.appendChild(columns[3]);
    col3 = frag;
  } else if (columns[2]) {
    col3 = columns[2];
  } else if (columns[3]) {
    col3 = columns[3];
  } else {
    col3 = '';
  }

  // Compose the cells for the block table: header row is a single cell, content row has three columns
  const cells = [
    ['Columns (columns30)'],
    [col1, col2, col3]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
