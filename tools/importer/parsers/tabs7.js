/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: one column
  const headerRow = ['Tabs (tabs7)'];

  // Each tab row: two columns (label, content)
  // Since there is no tab content in the provided HTML, content is empty
  const tabRows = Array.from(element.children).map((li) => {
    let label = '';
    const link = li.querySelector('a');
    if (link) {
      label = link.textContent.trim();
    } else {
      label = li.textContent.trim();
    }
    // Always create two columns per row, to match required structure
    return [label, ''];
  });

  // Compose the table: header row is one column, subsequent rows are two columns
  const cells = [headerRow, ...tabRows];

  // Create table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
