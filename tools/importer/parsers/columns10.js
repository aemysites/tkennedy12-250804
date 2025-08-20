/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct columns from the origin markup
  function getColumns(parent) {
    const colContainer = parent.querySelector('.parsys_column.pwccol2-longform');
    if (!colContainer) return [];
    // Get the two column divs in order
    return [
      colContainer.querySelector('.parsys_column.pwccol2-longform-c0'),
      colContainer.querySelector('.parsys_column.pwccol2-longform-c1'),
    ];
  }

  // The header row must match the example
  const headerRow = ['Columns (columns10)'];

  // Get the columns
  const columns = getColumns(element);

  // Defensive: if a column is missing, fill with an empty div
  const row = columns.map((colDiv) => {
    if (!colDiv) return document.createElement('div');
    // Find the innermost .cmp-container if available
    const container = colDiv.querySelector('.cmp-container');
    return container || colDiv;
  });

  // Only create two columns as in the example
  const cells = [headerRow, row];

  // Create table and replace original block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
