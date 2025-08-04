/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Columns (columns36)'];

  // Get the immediate children of the main grid: left (text/buttons), right (images)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const children = grid.querySelectorAll(':scope > div');
  if (children.length < 2) return;

  // Left column: preserve all structure (heading, paragraph, buttons)
  const leftContent = children[0];

  // Right column: get the grid of images
  let rightContent = null;
  const nestedGrid = children[1].querySelector('.grid-layout');
  if (nestedGrid) {
    // For semantic fidelity and resilience, include the grid itself (with all images)
    rightContent = nestedGrid;
  } else {
    // fallback: all images from right column
    const imgs = children[1].querySelectorAll('img');
    if (imgs.length > 0) {
      rightContent = Array.from(imgs);
    } else {
      // fallback: reference the whole right column
      rightContent = children[1];
    }
  }

  const contentRow = [leftContent, rightContent];

  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
