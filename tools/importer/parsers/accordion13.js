/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table rows array, starting with header
  const rows = [
    ['Accordion (accordion13)'],
  ];

  // For this HTML, the first child is also a divider, so select all direct children with class 'divider'
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Each divider contains a .w-layout-grid with two children: title and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // skip if no grid
    const children = Array.from(grid.children);
    const title = children[0] || document.createElement('div');
    const content = children[1] || document.createElement('div');
    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
