/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card anchor
  function extractCardInfo(card) {
    // Try to find image in '.utility-aspect-3x2' or direct child img
    let imgDiv = card.querySelector('.utility-aspect-3x2');
    let img = imgDiv ? imgDiv.querySelector('img') : card.querySelector('img');
    // Now extract heading and description
    let heading = card.querySelector('h3.h4-heading');
    let desc = card.querySelector('div.paragraph-sm');
    // Compose text cell: heading (if exists) and description (if exists)
    const textElements = [];
    if (heading) textElements.push(heading);
    if (desc) textElements.push(desc);
    // Always return two cells: [image or empty string, text content array or empty string]
    return [img ? img : '', textElements.length > 0 ? textElements : ''];
  }

  // Find all tab panes (each represents a distinct card set/grid)
  const tabPanes = element.querySelectorAll(':scope > div.w-tab-pane');
  tabPanes.forEach(tabPane => {
    // Find grid container with cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(':scope > a'));
    const rows = [];
    // Header row matches block name and variant as in example
    rows.push(['Cards (cards23)']);
    // Process each card
    cards.forEach(card => {
      rows.push(extractCardInfo(card));
    });
    // Create table using provided helper and replace grid in DOM
    const table = WebImporter.DOMUtils.createTable(rows, document);
    grid.replaceWith(table);
  });
  // After processing, replace the parent with all tables
  const tables = element.querySelectorAll('table');
  if (tables.length > 1) {
    const wrapper = document.createElement('div');
    tables.forEach(table => wrapper.appendChild(table));
    element.replaceWith(wrapper);
  } else if (tables.length === 1) {
    element.replaceWith(tables[0]);
  }
}
