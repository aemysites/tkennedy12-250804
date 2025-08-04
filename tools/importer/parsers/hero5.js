/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with block name exactly matching the example
  const headerRow = ['Hero (hero5)'];

  // 2. Get the hero image (background image)
  // It's the only <img> inside the main grid, outside the content area
  let heroImg = element.querySelector('img[src]');
  // If not found, leave as null (will create a row with empty cell)

  // 3. Get content: heading, paragraph, CTAs
  // Find the innermost grid with the actual textual content (with heading)
  let contentGrid = null;
  const innerGrids = element.querySelectorAll('.grid-layout');
  for (const g of innerGrids) {
    if (g.querySelector('h1, h2, h3, h4, h5, h6')) {
      contentGrid = g;
      break;
    }
  }

  // Defensive: If contentGrid is found, extract only the actual content area (div with class 'section')
  let content = contentGrid ? contentGrid.querySelector('.section') : null;
  // If not found, fallback to grid itself
  if (!content && contentGrid) {
    content = contentGrid;
  }

  // Compose table rows as specified: 1 col, 3 rows
  const rows = [
    headerRow,
    [heroImg],
    [content]
  ];

  // Create the table and replace the block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
