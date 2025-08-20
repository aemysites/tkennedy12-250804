/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero20)'];

  // 2. Background images (all images in the background collage)
  // Locate the grid of images (the first .grid-layout with .desktop-3-column)
  let backgroundImages = [];
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (grid) {
    const imgWrappers = grid.querySelectorAll('.utility-position-relative');
    imgWrappers.forEach(div => {
      const img = div.querySelector('img');
      if (img) backgroundImages.push(img);
    });
  }
  // If no images found, fallback to blank
  const backgroundCell = backgroundImages.length ? backgroundImages : '';

  // 3. Content cell (headline, subheading, CTA buttons)
  // Find the text content container (inside .ix-hero-scale-3x-to-1x-content .container)
  let contentCell = '';
  const contentSection = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentSection) {
    const textContainer = contentSection.querySelector('.container');
    if (textContainer) {
      contentCell = textContainer;
    } else {
      contentCell = contentSection;
    }
  }

  // Compose the table rows
  const cells = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
