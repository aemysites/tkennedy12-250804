/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per the example: exactly one column in the header row
  const headerRow = ['Columns (columns4)'];

  // Find all immediate column containers
  const columnDivs = element.querySelectorAll(':scope > div.parsys_column');

  // Each column gets its own cell in the content row
  const contentRow = Array.from(columnDivs).map((col) => {
    // Find direct child container of this column
    const containers = Array.from(col.children);
    if (containers.length === 1) {
      // Reference the full content inside the container for robustness
      return containers[0];
    } else if (containers.length > 1) {
      // Reference all children if there are multiple
      return containers;
    } else {
      // Fallback to the column itself if empty
      return col;
    }
  });

  // Compose the table rows: header is single cell, content row is array (one cell per column)
  const cells = [headerRow, contentRow];

  // Create the table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
