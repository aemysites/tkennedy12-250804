/* global WebImporter */
export default function parse(element, { document }) {
  // The example requires one header row and one content row with two columns per row.
  // Each column should combine all relevant content into one cell, even if it's multiple elements.

  // Step 1: Find the .container and the grid inside
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  const columns = Array.from(grid.children);
  // Defensive: if less than 2 columns, pad with empty divs
  if (columns.length < 2) {
    while (columns.length < 2) {
      const emptyDiv = document.createElement('div');
      columns.push(emptyDiv);
    }
  }
  // For robustness, build each cell as an array of all immediate children of the column
  const getColumnContent = (col) => {
    // If the column is empty, return empty string
    if (!col.hasChildNodes()) return '';
    // If the column has only one child, return the child directly
    const contents = Array.from(col.childNodes).filter(n => !(n.nodeType === 3 && !n.textContent.trim()));
    if (contents.length === 1) return contents[0];
    // Otherwise, return an array of nodes
    return contents;
  };

  const headerRow = ['Columns (columns35)'];
  const contentRow = [getColumnContent(columns[0]), getColumnContent(columns[1])];

  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
