/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get container and main grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get main column elements
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));
  if (gridChildren.length < 3) return;

  // 3. Extract left column: heading + testimonial + avatar block
  const heading = gridChildren[0];
  const testimonial = gridChildren[1];
  const innerGrid = gridChildren[2];
  const innerGridChildren = Array.from(innerGrid.querySelectorAll(':scope > *'));
  if (innerGridChildren.length < 3) return;
  const avatarBlock = innerGridChildren[1];
  const svgSignature = innerGridChildren[2];

  // 4. Compose left and right cell content, in vertical stack as in example
  const leftCellContent = [heading, testimonial, avatarBlock];
  const rightCellContent = [svgSignature];

  // 5. Compose rows for the block table
  const headerRow = ['Columns (columns26)'];
  const contentRow = [leftCellContent, rightCellContent];

  // 6. Build table and replace original element
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
