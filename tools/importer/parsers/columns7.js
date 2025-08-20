/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns7)'];
  // For each direct child (column), include *all* of its content (not just img)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each cell is the array of all child nodes (preserves all markup/text)
  const cells = columns.map(col => Array.from(col.childNodes));
  const tableRows = [
    headerRow,
    cells
  ];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}