/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child divs (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Create the block header row as a single cell (matches markdown example)
  // We'll set the colspan manually after the table is built
  const cells = [
    ['Columns (columns29)'],
    columns,
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set the header cell colspan to match the number of columns
  const th = table.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', columns.length);
  }

  // Replace original element with the new table
  element.replaceWith(table);
}
