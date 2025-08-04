/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Identify columns in the grid
  let textCol = null;
  let contactCol = null;
  let imageCol = null;

  for (const child of grid.children) {
    if (child.tagName === 'DIV' && !textCol) {
      textCol = child;
    } else if (child.tagName === 'UL' && !contactCol) {
      contactCol = child;
    } else if (child.tagName === 'IMG' && !imageCol) {
      imageCol = child;
    }
  }

  // Compose left column content (text + contact info)
  const leftColContent = [];
  if (textCol) leftColContent.push(textCol);
  if (contactCol) leftColContent.push(contactCol);

  // Header row must have two cells to match block structure exactly
  const headerRow = ['Columns (columns18)', ''];
  const contentRow = [leftColContent, imageCol ? imageCol : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
