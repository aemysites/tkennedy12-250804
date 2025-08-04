/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name
  const headerRow = ['Hero (hero28)'];

  // Find the image for the background
  let bgImgEl = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // The background image is inside a div with class ix-parallax-scale-out-hero in one of the grid children
    const gridChildren = grid.querySelectorAll(':scope > div');
    for (const child of gridChildren) {
      const img = child.querySelector('img');
      if (img) {
        bgImgEl = img;
        break;
      }
    }
  }
  const imgRow = [bgImgEl ? bgImgEl : ''];

  // Find the content cell: heading, subheading, etc.
  let contentCell = '';
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    // Look for the child with class container utility-z-index-2 ...
    for (const child of gridChildren) {
      if (child.classList.contains('container')) {
        contentCell = child;
        break;
      }
    }
  }
  // If not found, leave it empty
  const contentRow = [contentCell ? contentCell : ''];

  // Compose the table
  const cells = [headerRow, imgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
