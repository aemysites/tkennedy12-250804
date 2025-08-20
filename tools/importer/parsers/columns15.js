/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout');
  const gridChildren = grid ? Array.from(grid.children) : [];
  let leftCol = null;
  let rightCol = null;

  // The standard layout is two columns: left (content), right (image)
  if (gridChildren.length >= 2) {
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  } else {
    // fallback: treat entire grid as leftCol if not split
    leftCol = grid;
  }

  // Header row exactly as required
  const headerRow = ['Columns (columns15)'];

  // Left cell: reference all direct children of leftCol (heading, p, button group)
  // Reference existing elements directly, do not clone
  let leftCellContent = [];
  if (leftCol) {
    leftCellContent = Array.from(leftCol.children);
  }

  // Right cell: reference all direct children (usually just the image)
  let rightCellContent = [];
  if (rightCol) {
    rightCellContent = Array.from(rightCol.children);
    // Sometimes the image is the node itself
    if (rightCol.tagName === 'IMG') {
      rightCellContent = [rightCol];
    }
    // If empty, see if there's an img inside
    if (rightCellContent.length === 0) {
      const img = rightCol.querySelector('img');
      if (img) rightCellContent = [img];
    }
  }

  // Always fill both columns (even if missing, provide empty string)
  const contentRow = [leftCellContent.length ? leftCellContent : '', rightCellContent.length ? rightCellContent : ''];

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
