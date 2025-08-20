/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Prepare the header row exactly matching the block name
  const headerRow = ['Columns (columns18)'];

  // 2. Find the grid container that holds columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 3. Find the column children by their tag type/order
  // The structure is: [contentDiv, contactList, image]
  let contentDiv = null, contactList = null, image = null;
  Array.from(grid.children).forEach(child => {
    if (child.tagName === 'DIV') {
      contentDiv = child;
    } else if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Robustly handle missing children
  const leftColArr = [];
  if (contentDiv) leftColArr.push(contentDiv);
  if (contactList) leftColArr.push(contactList);
  const rightColArr = image ? [image] : [];

  // Both columns must be present, but can be empty if not found
  const columnsRow = [leftColArr, rightColArr];

  // 4. Build the table cells array; 2 columns per row
  const cells = [headerRow, columnsRow];

  // 5. Create the block using the helper
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element
  element.replaceWith(table);
}
