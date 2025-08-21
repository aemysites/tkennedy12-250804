/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per instructions
  const headerRow = ['Cards (cards20)'];
  
  // Attempt to find the container holding the card buttons
  const filterContainer = element.querySelector('.coe-filter');
  if (!filterContainer) {
    // If not found, replace the element with just the header (edge case: missing data)
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // Grab all direct button children (cards)
  const buttons = Array.from(filterContainer.querySelectorAll('.filter-button-item'));
  
  // If no buttons, just output the header row
  if (buttons.length === 0) {
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // For each button, create one row: 2 columns, first is empty (no image), second is the button element
  const rows = buttons.map(btn => [ '', btn ]);
  
  // Compose final cell structure
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
