/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid-layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid's children are laid out in a specific order:
  // [0]: main (large) left content (as a <a>)
  // [1]: upper right: vertical flex with two <a>s (with images)
  // [2]: lower right: vertical flex with multiple <a>s (text only, separated by dividers)

  const gridChildren = Array.from(grid.children);

  // Column 1: main (large) left <a>
  const col1 = gridChildren.find(el => el.tagName === 'A');

  // Column 2: first flex-horizontal (with two <a>s)
  const flexHorizontals = gridChildren.filter(el => el.classList.contains('flex-horizontal'));
  // The first flex-horizontal contains the two <a>s with images
  const col2Wrap = flexHorizontals[0];
  // Column 3: the second flex-horizontal contains the stack of text links
  const col3Wrap = flexHorizontals[1];

  // Defensive: check existence
  if (!col1 || !col2Wrap || !col3Wrap) return;

  // For column 2: take all top-level <a>s in col2Wrap
  const col2Links = Array.from(col2Wrap.querySelectorAll(':scope > a'));
  // For column 3: take all top-level <a>s in col3Wrap
  const col3Links = Array.from(col3Wrap.querySelectorAll(':scope > a'));

  // Compose cells: reference existing elements ONLY, not clones
  // Cells: [col1, [col2Link1, col2Link2], [col3Link1, ..., col3LinkN]]
  const cells = [
    ['Columns (columns2)'],
    [col1, col2Links, col3Links]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
