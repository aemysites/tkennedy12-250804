/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containers (top = text columns, bottom = image columns)
  const mainContainers = element.querySelectorAll(':scope > div');
  // Defensive: check if expected structure exists
  if (!mainContainers || mainContainers.length < 2) return;
  const topGrid = mainContainers[0].querySelector('.grid-layout'); // contains the 2 columns of text
  const bottomGrid = mainContainers[1].querySelector('.grid-layout'); // contains the 2 image columns

  // Defensive: check grids
  if (!topGrid || !bottomGrid) return;

  // --- Top row: two content columns (left = titles, right = card content) ---
  const topCols = Array.from(topGrid.children);
  // left column: 'Trend alert', h1
  const topLeft = topCols[0];
  // right column: description, author block, button
  const topRight = topCols[1];

  // --- Bottom row: two image columns ---
  const bottomCols = Array.from(bottomGrid.children);
  const bottomLeft = bottomCols[0];
  const bottomRight = bottomCols[1];

  // Table block header
  const headerRow = ['Columns (columns11)'];

  // Compose table rows, referencing existing elements for block resilience
  const cells = [
    headerRow,
    [topLeft, topRight],
    [bottomLeft, bottomRight]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
