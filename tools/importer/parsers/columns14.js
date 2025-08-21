/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child a.strip-btn elements (these are the columns)
  const links = Array.from(element.querySelectorAll(':scope > a.strip-btn'));
  // Defensive: if fewer than 4, fill with empty cells
  while (links.length < 4) {
    links.push(document.createElement('div'));
  }

  // Prepare rows for columns block: header, then two rows of two columns each
  const headerRow = ['Columns (columns14)'];
  
  // First data row (first two columns)
  const row1 = [links[0], links[1]];
  // Second data row (second two columns)
  const row2 = [links[2], links[3]];
  
  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1,
    row2
  ], document);
  
  // Replace the original element with the new table
  element.replaceWith(table);
}
