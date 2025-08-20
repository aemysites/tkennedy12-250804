/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row, matching example
  const rows = [['Accordion (accordion13)']];

  // Get all direct children with class 'divider' (each represents one accordion item)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Each divider contains a grid layout with two children:
    // 1. Title (usually a heading)
    // 2. Content (usually a rich-text div)
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      const children = Array.from(grid.children);
      // Defensive: check if we have at least two children (title and content)
      let title = children[0] || document.createElement('div');
      let content = children[1] || document.createElement('div');
      rows.push([title, content]);
    }
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
