/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all the columns (immediate children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length === 0) return;

  // The header row must be a single cell (one column)
  const headerRow = ['Columns (columns7)'];

  // The content row must match the number of columns (one cell per column)
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
