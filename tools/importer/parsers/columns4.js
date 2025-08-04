/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block (columns4)
  const headerRow = ['Columns (columns4)'];

  // Each column is a direct child <div> of the parent element
  // For maximum robustness, collect all content (not just <img>) inside each column
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, gather ALL children (not just images)
  const columns = columnDivs.map(col => {
    // If the column only has one child, return that child; otherwise, return all child nodes
    const children = Array.from(col.childNodes).filter(
      node => node.nodeType !== Node.COMMENT_NODE &&
              (node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== '')
    );
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      return children;
    } else {
      // If the column is empty, return an empty string
      return '';
    }
  });

  // Compose the table cells
  const cells = [
    headerRow,
    columns
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
