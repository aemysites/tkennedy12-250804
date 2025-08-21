/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Columns (columns19)'];

  // Helper function to get the main columns
  function getColumns(root) {
    // Try the standard structure
    const parsysColumns = root.querySelector('.parsys_column.pwccol2-longform');
    if (parsysColumns) {
      const childColumns = parsysColumns.querySelectorAll(':scope > .parsys_column');
      if (childColumns.length) {
        return Array.from(childColumns);
      }
    }
    // Fallback: get all direct children that look like columns
    return Array.from(root.querySelectorAll(':scope > div'));
  }

  // Get columns
  const columns = getColumns(element);

  // For each column, extract the relevant container (usually .cmp-container or the whole column)
  function getColumnContent(col) {
    // Usually, we want the first .cmp-container or the first div inside the column
    let content = col.querySelector(':scope > .cmp-container');
    if (!content) {
      // fallback: use the column itself
      content = col;
    }
    return content;
  }

  // If less than 2 columns, ensure we still have cells
  const col0Content = columns[0] ? getColumnContent(columns[0]) : document.createElement('div');
  const col1Content = columns[1] ? getColumnContent(columns[1]) : document.createElement('div');

  // Compose the cells array: header, then row with both columns
  const cells = [
    headerRow,
    [col0Content, col1Content]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
