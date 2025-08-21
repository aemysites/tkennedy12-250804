/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block spec
  const headerRow = ['Cards (cards17)'];

  // Find all card columns (3 in this layout)
  // Get each pwccol3-longform-cN column
  const columns = Array.from(element.querySelectorAll(':scope > div > div'));

  const rows = columns.map(col => {
    // Find the image element (mandatory)
    const img = col.querySelector('img');
    // Find the text content block (mandatory)
    const textContent = col.querySelector('.text-component');
    // If either is missing, still fill with null to keep structure safe
    return [img || '', textContent || ''];
  });

  // Compose final table array
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
