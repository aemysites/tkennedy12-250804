/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 'columnControl' block - which contains the columns
  const columnControl = element.querySelector('.columnControl');
  if (!columnControl) return;

  // Get the two column elements
  const columns = Array.from(columnControl.querySelectorAll(':scope > .parsys_column'));
  if (columns.length < 2) return;

  // For each column, find the main cmp-container (if any), else, the column itself
  const columnCells = columns.map(col => {
    // Try to find a content container directly inside the column
    const container = col.querySelector(':scope > .cmp-container');
    if (container) {
      // If container has only one child, use that child directly
      const kids = Array.from(container.children).filter(x => x.nodeType === 1 && x.innerHTML.trim() !== '');
      if (kids.length === 1) return kids[0];
      // If multiple, group in fragment
      const frag = document.createDocumentFragment();
      kids.forEach(kid => frag.appendChild(kid));
      return frag;
    } else {
      // fallback: use all non-empty direct children
      const kids = Array.from(col.children).filter(x => x.nodeType === 1 && x.innerHTML.trim() !== '');
      if (kids.length === 1) return kids[0];
      const frag = document.createDocumentFragment();
      kids.forEach(kid => frag.appendChild(kid));
      return frag;
    }
  });

  // Compose the table rows: header and content
  const headerRow = ['Columns (columns21)'];
  const contentRow = columnCells;

  // Build the columns block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the top-level section or container with the new table
  element.replaceWith(block);
}
