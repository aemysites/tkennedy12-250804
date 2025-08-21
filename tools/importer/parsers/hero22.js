/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (block name)
  const headerRow = ['Hero (hero22)'];

  // 2. Background Image Row (optional)
  // Find the hero block's main image (picture or img)
  let backgroundImg = '';
  const imageWrapper = element.querySelector('.herov2__image-wrapper picture');
  if (imageWrapper) {
    backgroundImg = imageWrapper;
  } else {
    // fallback: direct img
    const directImg = element.querySelector('.herov2__image-wrapper img');
    if (directImg) {
      backgroundImg = directImg;
    }
  }

  // 3. Content Row: Heading, Subheading, CTA (if exists)
  // All as DOM elements, and only if present
  const contentWrapper = element.querySelector('.herov2__content-wrapper');
  const contentCells = [];
  if (contentWrapper) {
    // Find subheading (above heading)
    const subtitle = contentWrapper.querySelector('.herov2__subtitle');
    if (subtitle) contentCells.push(subtitle);
    // Find heading
    const heading = contentWrapper.querySelector('.herov2__title, h1, h2, h3');
    if (heading) contentCells.push(heading);
    // Find call-to-action (button or link)
    const cta = contentWrapper.querySelector('a');
    if (cta) contentCells.push(cta);
  }

  // Guarantee correct structure: if nothing found for content, leave cell empty
  const contentRow = contentCells.length ? [contentCells] : [''];

  // Build block table
  const cells = [
    headerRow,
    [backgroundImg],
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
