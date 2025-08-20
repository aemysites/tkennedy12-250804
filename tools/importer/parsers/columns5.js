/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for columns5 block
  const headerRow = ['Columns (columns5)'];

  // Find the two column containers
  const columns = element.querySelectorAll('.parsys_column');

  // Defensive: If not exactly two columns, bail
  if (columns.length !== 2) return;

  // Prepare an array for each column's cell content
  const cellContents = [];

  // First column: usually image
  const col1 = columns[0];
  // Prefer the first image in this column
  const col1Img = col1.querySelector('img');
  if (col1Img) {
    cellContents.push(col1Img);
  } else {
    // If no image, use all children as fallback
    cellContents.push(...Array.from(col1.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())));
  }

  // Second column: usually text (list)
  const col2 = columns[1];
  // Find the text-component (ul)
  const textComp = col2.querySelector('.text-component');
  if (textComp) {
    // Use the ul if present, else all children
    const ul = textComp.querySelector('ul');
    if (ul) {
      cellContents.push(ul);
    } else {
      cellContents.push(...Array.from(textComp.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())));
    }
  } else {
    // If no text-component, use all children as fallback
    cellContents.push(...Array.from(col2.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())));
  }

  // Compose the table cells
  const cells = [
    headerRow,
    cellContents
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(block);
}