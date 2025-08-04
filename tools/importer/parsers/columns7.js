/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, try to extract the main image (if any)
  const cellsRow = columnDivs.map(div => {
    // If the div is an aspect ratio wrapper with an img inside, use the img for the cell
    const img = div.querySelector('img');
    if (img) return img;
    // Otherwise, use the entire div in the cell
    return div;
  });

  // Header matches the example exactly
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns7)'],
    cellsRow
  ], document);
  element.replaceWith(table);
}
