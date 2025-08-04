/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing both text and image
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // Find the prominent image (background image for the hero)
  // Assume only one image directly under mainGrid
  const heroImg = mainGrid.querySelector('img');

  // Find the text content area (grid-layout.container)
  const container = mainGrid.querySelector('.w-layout-grid.container');
  let section = null;
  if (container) {
    // The section with heading, paragraph, and buttons
    section = container.querySelector('.section');
  }

  const contentEls = [];
  if (section) {
    // Heading (grab any heading tag)
    const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentEls.push(heading);
    // Paragraph(s)
    const richText = section.querySelector('.rich-text, .rich-text.paragraph-lg');
    if (richText) contentEls.push(richText);
    // Button group
    const buttonGroup = section.querySelector('.button-group');
    if (buttonGroup) contentEls.push(buttonGroup);
  }

  // Compose table rows
  const headerRow = ['Hero (hero5)']; // Must match example exactly
  const imageRow = [heroImg ? heroImg : '']; // Always a single cell, even if empty
  const contentRow = [contentEls]; // All text/button content in one cell as array

  // Compose the block table data
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
