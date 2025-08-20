/* global WebImporter */
export default function parse(element, { document }) {
  // 1. HEADER ROW: Block name (must match example exactly)
  const headerRow = ['Hero (hero39)'];

  // 2. ROW 2: Background Image (optional)
  let bgImg = null;
  // Try to find an image used as a background (usually absolutely positioned)
  // Only pick first <img> in the block
  const imgElem = element.querySelector('img');
  if (imgElem) {
    bgImg = imgElem;
  }
  const row2 = [bgImg ? bgImg : ''];

  // 3. ROW 3: Content (heading, subheading, cta, etc)
  // Locate the main content container for text, heading, and cta
  let contentBlock = null;
  // The structure is: header > div.grid-layout > ...
  // There are two main grid children: first is background, second is content
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (grid) {
    // Get all direct children (not all descendants) of the grid
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      // Content is in the second child
      const contentContainer = gridChildren[1];
      // It may have a nested grid holding the heading/buttons
      const nestedGrid = contentContainer.querySelector('.w-layout-grid');
      if (nestedGrid) {
        contentBlock = nestedGrid;
      } else {
        contentBlock = contentContainer;
      }
    }
  }
  const row3 = [contentBlock ? contentBlock : ''];

  // 4. Compose the block table
  const cells = [headerRow, row2, row3];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element in the DOM
  element.replaceWith(table);
}
