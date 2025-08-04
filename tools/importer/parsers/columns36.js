/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container that holds the main grid
  const container = element.querySelector('.container');
  if (!container) return;
  // The main grid containing two columns
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridCols = Array.from(grid.children);

  // The left column: text and buttons
  const leftCol = gridCols[0];
  // The right column: grid of images
  const rightCol = gridCols[1];

  // Get all content from leftCol
  let leftContent = [];
  if (leftCol) {
    leftContent = Array.from(leftCol.childNodes).filter(node => {
      // Only include elements or non-empty text nodes
      return (node.nodeType === Node.ELEMENT_NODE) ||
             (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    });
  }

  // Get images from the right grid
  let rightContent = [];
  if (rightCol) {
    const imgGrid = rightCol.querySelector('.w-layout-grid');
    if (imgGrid) {
      rightContent = Array.from(imgGrid.children).filter(el => el.tagName === 'IMG');
    }
  }

  // Build the columns block table
  // Header row must be a single cell to match the example
  const cells = [
    ['Columns (columns36)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
