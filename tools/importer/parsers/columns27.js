/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 2-column grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid -- expect two (content and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column (text content)
  const left = columns[0];
  // Second column (image)
  const right = columns[1];

  // Left column: gather all direct children (eyebrow, heading, paragraphs, button)
  const leftNodes = Array.from(left.childNodes)
    .filter((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Filter out empty text nodes
        return node.textContent.trim().length > 0;
      }
      return true;
    });

  // Right column: likely an image element
  let rightCellContent = [];
  if (right.tagName === 'IMG') {
    rightCellContent = [right];
  } else {
    // Could be a container, find any images
    const imgs = right.querySelectorAll('img');
    if (imgs.length > 0) {
      rightCellContent = Array.from(imgs);
    } else {
      // Fallback: all direct children
      rightCellContent = Array.from(right.childNodes).filter((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim().length > 0;
        }
        return true;
      });
    }
  }

  // Table structure: Header row, then one row with two columns
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftNodes, rightCellContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
