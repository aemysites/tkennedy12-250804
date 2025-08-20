/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: skip if there are no columns
  if (!columnDivs.length) return;

  // Each cell should reference the entire column div, not just its images
  const contentRow = columnDivs.map(div => div);

  // Table header matches spec exactly
  const headerRow = ['Columns (columns38)'];
  const cells = [headerRow, contentRow];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
