/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header row
  const headerRow = ['Hero (hero28)'];

  // 1. Find the background image (first .w-layout-grid > div, find img)
  let imgEl = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridCells = grid.querySelectorAll(':scope > div');
    if (gridCells.length > 0) {
      imgEl = gridCells[0].querySelector('img');
    }
  }

  // 2. Find the text content (second .w-layout-grid > div)
  let textContentEl = null;
  if (grid) {
    const gridCells = grid.querySelectorAll(':scope > div');
    if (gridCells.length > 1) {
      // Use the content inside .utility-margin-bottom-6rem if present, else all children
      const container = gridCells[1];
      const mainText = container.querySelector('.utility-margin-bottom-6rem');
      // If .utility-margin-bottom-6rem exists and is not empty, use that
      if (mainText && mainText.childNodes.length > 0) {
        textContentEl = mainText;
      } else {
        // Otherwise, fallback to the container itself
        textContentEl = container;
      }
    }
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [imgEl ? imgEl : ''],
    [textContentEl ? textContentEl : '']
  ];

  // Remove empty rows except header
  const cells = [rows[0]];
  if (imgEl) cells.push(rows[1]);
  if (textContentEl) cells.push(rows[2]);

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
