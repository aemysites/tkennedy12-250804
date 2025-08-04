/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children by selector
  function getImmediateChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // Find the .container (top level)
  const container = element.querySelector('.container');
  if (!container) return;

  // The first grid: two columns (headline+eyebrow, then body/author/button)
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const gridCols = getImmediateChildrenBySelector(mainGrid, 'div');
  // Defensive: Must be at least two columns
  if (gridCols.length < 2) return;

  // leftCol: headline group (eyebrow, h1)
  const leftCol = gridCols[0];
  // rightCol: text, author, button -- fix: ensure all content is included
  const rightCol = gridCols[1];
  // Instead of only childNodes, grab ALL content inside rightCol (including descendants)
  // To reference the entire existing block, simply use rightCol itself, not a new element.

  // The second grid: two images (bottom row)
  const imagesGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  if (!imagesGrid) return;
  const imageDivs = getImmediateChildrenBySelector(imagesGrid, 'div.utility-aspect-1x1');
  // Defensive for images
  const img1 = imageDivs[0] ? imageDivs[0].querySelector('img') : null;
  const img2 = imageDivs[1] ? imageDivs[1].querySelector('img') : null;

  // Compose rows for the table
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftCol, rightCol]; // fix: reference rightCol directly to include all its content
  const imagesRow = [img1 || '', img2 || ''];

  const cells = [
    headerRow,
    contentRow,
    imagesRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
