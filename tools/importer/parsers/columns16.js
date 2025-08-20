/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, exactly as specified
  const headerRow = ['Columns (columns16)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each direct child of grid is a column
  const gridColumns = Array.from(grid.children);

  // For each column, extract ALL relevant content as a cell
  const contentRow = gridColumns.map(col => {
    // Get all descendants with content (elements or non-empty text nodes)
    // In Webflow/WF exported columns structure, there may be an extra wrapper
    // Prefer to grab all children below the column div
    let target = col;
    // If only one child and that child has at least one element, treat that as column content block
    if (col.children.length === 1 && col.children[0].children.length > 0) {
      target = col.children[0];
    }
    // Gather all element children and meaningful text nodes
    const nodes = [];
    for (const node of target.childNodes) {
      if (node.nodeType === 1) {
        nodes.push(node);
      } else if (
        node.nodeType === 3 && node.textContent && node.textContent.trim().length > 0
      ) {
        // Create a span to preserve inline text node
        const span = document.createElement('span');
        span.textContent = node.textContent;
        nodes.push(span);
      }
    }
    // If nothing, fallback to the column itself
    return nodes.length === 1 ? nodes[0] : nodes.length > 1 ? nodes : target;
  });

  // Build table: header row (single cell), content row (multiple columns)
  const tableArray = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
