/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns4)'];

  // Get all immediate column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract ALL its direct children (text, images, links, etc.)
  // Instead of just the image, collect all its child nodes
  const numCols = 4; // Example structure shows 4 columns
  const columnsContent = columnDivs.slice(0, numCols).map(div => {
    // Get all children (nodes) of the div
    const content = Array.from(div.childNodes).filter(node => {
      // Keep element nodes and non-empty text nodes
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
    });
    // If there's only one content node, just return it. If multiple, return as array.
    if (content.length === 1) {
      return content[0];
    }
    return content;
  });

  // Build table rows
  const cells = [headerRow, columnsContent];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
