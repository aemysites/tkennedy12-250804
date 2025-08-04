/* global WebImporter */
export default function parse(element, { document }) {
  // Header: block name as in the example
  const headerRow = ['Hero (hero5)'];

  // Find the main image (background/visual)
  const img = element.querySelector('img');
  const imageRow = [img || ''];

  // Find the main content area (title, body, CTAs)
  let contentElements = [];
  // The grid that contains the text and CTAs
  const gridContainer = element.querySelector('.grid-layout.container');
  let sectionContent = null;
  if (gridContainer) {
    sectionContent = gridContainer.querySelector('.section');
  }
  if (sectionContent) {
    // Title
    const h2 = sectionContent.querySelector('h2');
    if (h2) contentElements.push(h2);
    // Paragraph (subtitle/desc)
    // Prefer rich-text/container, but fallback to any <p>
    let subtitle = sectionContent.querySelector('.rich-text, .w-richtext');
    if (subtitle) {
      contentElements.push(subtitle);
    } else {
      // Collect all direct paragraph children
      sectionContent.querySelectorAll(':scope > p').forEach((p) => {
        contentElements.push(p);
      });
    }
    // CTAs (button group)
    const ctaGroup = sectionContent.querySelector('.button-group');
    if (ctaGroup) contentElements.push(ctaGroup);
  }
  const contentRow = [contentElements.length > 0 ? contentElements : ''];

  // Compose rows
  const rows = [headerRow, imageRow, contentRow];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
