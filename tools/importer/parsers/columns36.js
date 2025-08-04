/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  // Defensive: fallback if grid's children not as expected
  if (gridChildren.length < 2) return;
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // LEFT COLUMN: collect heading, subheading, and buttons as a block
  const leftContent = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: grid of images
  let rightContent = [];
  const innerGrid = rightCol.querySelector('.w-layout-grid');
  if (innerGrid) {
    // Only immediate img children
    rightContent = Array.from(innerGrid.children).filter(node => node.tagName === 'IMG');
  }

  // Compose the cells array for columns block (single header row, then 2 columns)
  const cells = [
    ['Columns (columns36)'],
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
