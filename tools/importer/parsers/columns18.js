/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container for the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid (which form the columns)
  const gridChildren = Array.from(grid.children);

  // In this HTML, the layout is:
  // - First: left text content (h2, h3, p)
  // - Second: ul list (contacts)
  // - Third: image
  // Visually, left = first + second (text + contacts), right = third (image)

  let leftContent = null;
  let contactList = null;
  let rightImage = null;

  // Assign content
  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && !leftContent) {
      leftContent = child;
    } else if (child.tagName === 'UL' && !contactList) {
      contactList = child;
    } else if (child.tagName === 'IMG' && !rightImage) {
      rightImage = child;
    }
  }

  // Defensive: If leftContent missing, do nothing
  if (!leftContent) return;

  // Compose left block: want to keep heading, subheading, and the contact ul (if present)
  // We'll create a wrapper div for left cell if both are present, else just use leftContent
  let leftCell;
  if (contactList) {
    const leftDiv = document.createElement('div');
    leftDiv.appendChild(leftContent);
    leftDiv.appendChild(contactList);
    leftCell = leftDiv;
  } else {
    leftCell = leftContent;
  }

  // Compose right block: just the image (or null if not found)
  const rightCell = rightImage || '';

  // Prepare table cells: header and content row (with left and right columns)
  // HEADER: must be a single cell/column only
  const headerRow = ['Columns (columns18)'];
  // The content row: two columns
  const contentRow = [[leftCell, rightCell]];

  // Create table and swap in
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...contentRow
  ], document);
  element.replaceWith(table);
}
