/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the container with the columns content
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // The structure is:
  // grid.children[0]: left large card (feature)
  // grid.children[1]: right-top stack (contains 2 cards)
  // grid.children[2]: right-bottom stack (contains 6 cards with dividers)
  // We'll have two columns: left is the feature, right is the stack of cards

  // Left column: the feature card (an <a> with image, tag, heading, and p)
  const leftCol = grid.children[0];

  // Right column: create a container <div> and append all children of the two right stack columns, preserving order
  const rightColDiv = document.createElement('div');
  [grid.children[1], grid.children[2]].forEach(stack => {
    Array.from(stack.children).forEach(el => {
      rightColDiv.appendChild(el);
    });
  });

  // Column cell definitions: reference original element nodes directly
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCol, rightColDiv];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
