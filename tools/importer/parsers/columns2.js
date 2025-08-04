/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have a section with a .container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // The columns structure is:
  // [0]: Big left feature <a>
  // [1]: Upper-right column with 2 <a>
  // [2]: Lower-right column with 6 <a> separated by .divider
  const children = Array.from(grid.children);
  if (children.length < 3) return;
  const leftBlock = children[0];
  const upperRight = children[1];
  const lowerRight = children[2];

  // LEFT COLUMN: reference the existing leftBlock as is

  // RIGHT COLUMN: gather all <a> from upperRight and lowerRight in order, preserving structure
  const rightCol = document.createElement('div');
  // First, all links from upperRight
  const upperRightLinks = Array.from(upperRight.querySelectorAll(':scope > a'));
  upperRightLinks.forEach(a => rightCol.appendChild(a));
  // Then, all links from lowerRight separated by divider, but we only want the links (not dividers)
  const lowerRightChildren = Array.from(lowerRight.children);
  lowerRightChildren.forEach((child, idx) => {
    if (child.tagName === 'A') {
      rightCol.appendChild(child);
    }
    // Ignore dividers (.divider)
  });

  // Header row exactly as required
  const headerRow = ['Columns (columns2)'];

  // One row, two columns, as in the example
  const contentRow = [leftBlock, rightCol];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
