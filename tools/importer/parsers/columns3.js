/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  let grid = element.querySelector('.w-layout-grid');
  if (!grid) grid = element.querySelector('[class*="grid"]');
  if (!grid) return;

  // Get grid columns (children of the grid)
  const columns = Array.from(grid.children);

  // Each column: build a cell with all direct children transferred (not cloned)
  const columnCells = columns.map((col) => {
    // Gather element children (preserving tags/semantics)
    // If multiple children, put all in an array
    const nodes = Array.from(col.childNodes).filter(n => {
      // Remove empty text nodes
      return !(n.nodeType === Node.TEXT_NODE && !n.textContent.trim());
    });
    if (nodes.length === 1) {
      return nodes[0];
    } else if (nodes.length > 1) {
      return nodes;
    } else {
      // fallback for empty columns
      return '';
    }
  });

  // Header row must have one cell, matching example, and span all columns.
  // We'll let the importer downstream handle colspan, so just provide 1 cell.
  const headerRow = [
    'Columns (columns3)',
    ...Array(columns.length - 1).fill('')
  ];

  // Compose the table
  const rows = [headerRow, columnCells];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
