/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector(':scope > .w-layout-grid, :scope > div.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children).filter(el => el.nodeType === 1);
  // Defensive: need heading and content columns
  if (gridChildren.length < 2) return;
  // Left: heading h2, Right: descriptive block with text and button
  const heading = gridChildren[0];
  const rightBlock = gridChildren[1];

  // In Columns (columns14) the visual structure is: left column = heading + paragraph + button, right column empty (since there are only two children)
  // But the example is a two-column table -- so for this HTML, we should make column 1: heading, column 2: text + button

  // Gather content for left cell (heading)
  const leftCell = heading;
  // Gather content for right cell (all children of rightBlock)
  const rightCellChildren = Array.from(rightBlock.childNodes).filter(node => {
    // Only include element nodes or meaningful text nodes
    return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
  });
  // If there is only one element, just use the element. If multiple, use array.
  let rightCell;
  if (rightCellChildren.length === 1) {
    rightCell = rightCellChildren[0];
  } else {
    rightCell = rightCellChildren;
  }

  // Build the table as in the example: header is single cell, content row has two columns
  const cells = [
    ['Columns (columns14)'],
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
