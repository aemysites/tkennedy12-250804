/* global WebImporter */
export default function parse(element, { document }) {
  // Grab the main grid with two columns (headline/eyebrow + content)
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const mainColumns = Array.from(mainGrid.children);
  // Defensive: set up empty cell fallback
  let leftCell = '';
  let rightCell = '';

  // LEFT CELL (eyebrow + h1)
  if (mainColumns[0]) {
    const items = [];
    Array.from(mainColumns[0].children).forEach(child => items.push(child));
    if (items.length) leftCell = items;
  }

  // RIGHT CELL (rich text, byline, button)
  if (mainColumns[1]) {
    const items = [];
    const richText = mainColumns[1].querySelector('.rich-text');
    if (richText) items.push(richText);
    const bylineGrid = mainColumns[1].querySelector('.w-layout-grid');
    if (bylineGrid) items.push(bylineGrid);
    const button = mainColumns[1].querySelector('a.button, a.w-button');
    if (button) items.push(button);
    if (items.length) rightCell = items;
  }

  // IMAGE ROW: images in the lower grid (two columns)
  const imageGrid = element.querySelector('.w-layout-grid.mobile-portrait-1-column');
  let imgCell1 = '';
  let imgCell2 = '';
  if (imageGrid) {
    const imgDivs = Array.from(imageGrid.children);
    if (imgDivs[0]) {
      const img = imgDivs[0].querySelector('img');
      imgCell1 = img ? img : imgDivs[0];
    }
    if (imgDivs[1]) {
      const img = imgDivs[1].querySelector('img');
      imgCell2 = img ? img : imgDivs[1];
    }
  }

  // The header row must be a single-cell array as per requirements
  const headerRow = ['Columns (columns11)'];

  // Build table rows: header, main content, images
  const cells = [
    headerRow,
    [leftCell, rightCell],
    [imgCell1, imgCell2],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
