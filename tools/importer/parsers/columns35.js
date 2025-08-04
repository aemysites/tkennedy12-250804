/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (these are the columns)
  const gridChildren = Array.from(grid.children);

  // From the sample HTML:
  // - The first child is a div with header and subheading
  // - The second child is the button

  // First column content: All children of the first grid child
  const col1Container = gridChildren[0];
  // Defensive: if for some reason it's not found, skip processing
  if (!col1Container) return;
  // Gather all child nodes (preserves heading and subheading)
  const col1Content = Array.from(col1Container.childNodes)
    .filter(node => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());

  // Second column content: the button itself (the <a> element)
  const col2Container = gridChildren[1];
  if (!col2Container) return;
  // Use the <a> directly
  const col2Content = col2Container;

  // Construct the header row
  const headerRow = ['Columns (columns35)'];
  // Construct the content row, each cell is a column
  const contentRow = [
    col1Content.length === 1 ? col1Content[0] : col1Content,
    col2Content
  ];

  // Build the block table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element in the DOM
  element.replaceWith(table);
}
