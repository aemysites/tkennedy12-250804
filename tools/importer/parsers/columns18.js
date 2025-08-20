/* global WebImporter */
export default function parse(element, { document }) {
  // The header row for the Columns block
  const headerRow = ['Columns (columns18)'];

  // Attempt to get the column divs (structure may vary)
  const columns = element.querySelectorAll(':scope > .parsys_column');
  // Ensure there are two columns as in the example
  if (columns.length !== 2) return;

  // First column: contains image
  let imageCell = '';
  const firstCol = columns[0];
  // Try to find an <img> inside the first column
  const img = firstCol.querySelector('img');
  if (img) {
    imageCell = img;
  } else {
    // If no image, fallback to whatever content the column has (empty string if nothing)
    imageCell = firstCol.innerHTML.trim() ? firstCol : '';
  }

  // Second column: contains text content (heading, paragraph, link/button)
  let textCell = '';
  const secondCol = columns[1];
  // Find the main text container (it may vary, so be flexible)
  const textComponent = secondCol.querySelector('.text-component');
  if (textComponent) {
    textCell = textComponent;
  } else {
    // fallback to the full column, preserving all content
    textCell = secondCol.innerHTML.trim() ? secondCol : '';
  }

  // Build cells for the table: first row is header, second is the columns
  const cells = [
    headerRow,
    [imageCell, textCell]
  ];

  // Create the block table using the helper
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
