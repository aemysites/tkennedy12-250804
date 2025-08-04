/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified by the block/component name in the prompt
  const headerRow = ['Accordion (accordion13)'];

  // We want to collect all accordion items, which are .divider children
  // Each .divider contains a .w-layout-grid with two children: [title, content]
  const rows = [];
  // Only consider direct children of the main element, to avoid nesting edge cases
  const dividers = Array.from(element.children).filter(el => el.classList.contains('divider'));

  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      // Each grid should have two children: [title, content]
      const gridChildren = Array.from(grid.children);
      if (gridChildren.length >= 2) {
        const title = gridChildren[0];
        const content = gridChildren[1];
        rows.push([title, content]);
      }
    }
  });

  // Table structure: header row, then one row for each accordion item
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
