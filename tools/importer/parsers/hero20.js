/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the block table
  const headerRow = ['Hero (hero20)'];

  // 2. Background images cell (2nd row)
  // Find the main grid that holds background images
  let bgImagesCell = '';
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (grid) {
    const imgEls = grid.querySelectorAll('img');
    if (imgEls.length > 0) {
      // Use a container div to hold all images for layout preservation
      const bgDiv = document.createElement('div');
      imgEls.forEach(img => bgDiv.appendChild(img));
      bgImagesCell = bgDiv;
    }
  }

  // 3. Content cell (3rd row)
  // Find the content area that contains heading, subheading, CTA
  let contentCell = '';
  // The content is in the .ix-hero-scale-3x-to-1x-content node, inside a .container
  const contentWrapper = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentWrapper) {
    // We reference the existing element, do not clone or re-create
    contentCell = contentWrapper;
  }

  // 4. Compose the rows for the block table
  const cells = [
    headerRow,
    [bgImagesCell],
    [contentCell],
  ];

  // 5. Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
