/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grid (the two columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);
  // Defensive: Check we have at least 2 columns
  if (children.length < 2) return;

  // Identify left and right columns
  let leftCol, rightCol;
  // Look for the image element (should be one of the columns)
  if (children[0].tagName === 'IMG') {
    leftCol = children[0];
    rightCol = children[1];
  } else if (children[1].tagName === 'IMG') {
    leftCol = children[1];
    rightCol = children[0];
  } else {
    // fallback, just use order
    leftCol = children[0];
    rightCol = children[1];
  }

  // The rightCol content may be wrapped in a div, we want all its children
  let rightContent = [];
  if (rightCol.children.length > 0) {
    rightContent = Array.from(rightCol.children);
  } else {
    rightContent = [rightCol];
  }

  // Build the columns block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns1)'],
    [leftCol, rightContent]
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
