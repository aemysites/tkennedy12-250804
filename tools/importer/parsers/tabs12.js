/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab buttons inside .coe-filter
  const filterDiv = element.querySelector('.coe-filter');
  let tabButtons = [];
  if (filterDiv) {
    tabButtons = Array.from(filterDiv.querySelectorAll('button.filter-button-item'));
  }

  if (tabButtons.length === 0) {
    return;
  }

  // Each tab: button in first cell, empty string in second cell (no tab content in provided HTML)
  const rows = tabButtons.map((btn) => [btn, '']);

  // Compose cells with header row as a single element for colspan
  const cells = [[document.createElement('span')], ...rows];
  cells[0][0].textContent = 'Tabs (tabs12)';

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Set the colspan for the header cell to span both columns
  const headerRow = block.querySelector('tr');
  const headerCell = headerRow && headerRow.querySelector('th');
  if (headerCell) {
    headerCell.setAttribute('colspan', '2');
  }

  // Replace the original element
  element.replaceWith(block);
}
