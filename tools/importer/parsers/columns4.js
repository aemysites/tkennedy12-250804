/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column container
  let columnWrapper = element.querySelector(':scope > .parsys_column');
  if (!columnWrapper) columnWrapper = element;
  const columnDivs = Array.from(columnWrapper.children);

  // Extract content for each column
  const cells = columnDivs.map(colDiv => {
    let cmpContainer = colDiv.querySelector(':scope > .cmp-container');
    if (!cmpContainer) cmpContainer = colDiv.firstElementChild;
    if (!cmpContainer) return '';
    const meaningfulChildren = Array.from(cmpContainer.children).filter(el => {
      if (el.tagName === 'DIV' && el.children.length === 0 && el.textContent.trim() === '') return false;
      return true;
    });
    if (meaningfulChildren.length === 0) return '';
    if (meaningfulChildren.length === 1) return meaningfulChildren[0];
    return meaningfulChildren;
  });

  // Header row: same number of columns as the cells row
  const headerRow = ['Columns (columns4)'];
  for (let i = 1; i < cells.length; i++) headerRow.push('');

  const tableRows = [headerRow, cells];
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
