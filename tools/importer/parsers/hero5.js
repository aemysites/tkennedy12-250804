/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match example exactly
  const headerRow = ['Hero (hero5)'];

  // Find prominent image (should be the only <img> child at top-level)
  const img = element.querySelector('img');
  // If no image, use null for cell
  const imageCell = img || '';

  // Find main content block containing headline, paragraph, CTA
  // The structure is: section > grid > grid > section (with h2, .rich-text, .button-group)
  // Safely get the section with the text/buttons
  let contentSection = null;
  const innerGrids = element.querySelectorAll(':scope > div > div');
  // Usually first inner grid's first child is the section
  if (innerGrids.length) {
    const possibleSection = innerGrids[0].querySelector(':scope > div');
    if (possibleSection) {
      contentSection = possibleSection;
    } else {
      // Fallback
      contentSection = innerGrids[0];
    }
  } else {
    // fallback: look for .section class in descendants
    contentSection = element.querySelector('.section');
  }
  
  const contentCell = contentSection || '';

  // Build final table (1 column, 3 rows)
  const cells = [
    headerRow,
    [imageCell],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
