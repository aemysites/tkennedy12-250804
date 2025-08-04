/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Each direct child of grid is a column
  const columnDivs = Array.from(grid.children);
  // For each column, include all its direct content as a cell (robust for any content)
  const columns = columnDivs.map(col => {
    // Collect all child nodes (including text nodes if any)
    const colContent = Array.from(col.childNodes).filter(node => {
      // Keep non-empty text nodes and element nodes
      return (node.nodeType === Node.ELEMENT_NODE) || (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
    });
    return colContent.length === 1 ? colContent[0] : colContent;
  });
  // Table: header row, then a row with all columns as cells
  const cells = [
    ['Columns (columns16)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
