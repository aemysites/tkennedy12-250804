/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell with 'Tabs'
  const headerRow = ['Tabs'];
  // Get all tabs (li children)
  const tabItems = Array.from(element.children);
  // Each tab row: [tab label, empty string for content]
  const rows = tabItems.map(li => {
    let label = '';
    const a = li.querySelector('a');
    if (a) {
      label = a.textContent.trim();
    } else {
      label = li.textContent.trim();
    }
    return [label, ''];
  });
  // The table must have a single cell in the header row, and two cells in each tab row
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
