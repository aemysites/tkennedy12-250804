/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main two-column grid: first row of the layout
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftCol = null, rightCol = null;
  if (mainGrid) {
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  }

  // Get left content (eyebrow, heading)
  const leftContent = [];
  if (leftCol) {
    Array.from(leftCol.childNodes).forEach(node => {
      // Only push Elements or significant Text nodes
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        leftContent.push(node);
      }
    });
  }

  // Get right content (paragraph, byline, button, etc)
  const rightContent = [];
  if (rightCol) {
    Array.from(rightCol.childNodes).forEach(node => {
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        rightContent.push(node);
      }
    });
  }

  // Get lower image grid (two images)
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imageGrid) {
    const imgs = Array.from(imageGrid.querySelectorAll('img'));
    imageCells = imgs;
  }

  // Build table in the structure of the markdown example:
  // header row: [Columns (columns11)]
  // second row: [main info col, image col]
  // third row:  [image col, info col]
  const headerRow = ['Columns (columns11)'];

  // First row - left: all info, right: first image
  const firstImg = imageCells[0] || '';
  const secondImg = imageCells[1] || '';
  const row1 = [
    [...leftContent, ...rightContent],
    firstImg
  ];

  // Second row - left: second image, right: (empty)
  const row2 = [
    secondImg,
    ''
  ];

  const cells = [
    headerRow,
    row1,
    row2
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}