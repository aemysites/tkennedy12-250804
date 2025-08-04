/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single-column array
  const headerRow = ['Columns (columns4)'];

  // Get all direct child column divs
  const colDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column div, extract the <img> (or fallback to the div itself)
  const columns = colDivs.map(div => {
    const img = div.querySelector('img');
    if (img) return img;
    return div;
  });

  // Compose the table rows as arrays (header is single cell, columns is multiple)
  const cells = [
    headerRow,      // single cell for header
    columns         // one cell per column (images)
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
