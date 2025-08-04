/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns (immediate children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the contained image or fallback to empty string
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : '';
  });
  // Ensure header row is a single cell (matches the example exactly)
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns29)'], // header: exactly one column
    cells // content row: as many columns as needed
  ], document);
  element.replaceWith(table);
}