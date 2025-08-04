/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header
  const headerRow = ['Accordion (accordion13)'];

  // Each direct child '.divider' is an accordion item
  const panels = Array.from(element.querySelectorAll(':scope > .divider'));

  // For each panel, extract the title and content elements
  const rows = panels.map(panel => {
    // Each divider has a grid-layout with two direct children: title and content
    const grid = panel.querySelector('.grid-layout');
    if (!grid) return ['', ''];
    // Find immediate children for robustness
    const children = Array.from(grid.children);
    // Title cell: typically class 'h4-heading'
    const titleElem = children.find(el => el.classList.contains('h4-heading')) || '';
    // Content cell: typically class 'rich-text'
    const contentElem = children.find(el => el.classList.contains('rich-text')) || '';
    // Reference elements directly, do not clone
    return [titleElem, contentElem];
  });

  // Build the table structure
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
