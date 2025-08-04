/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the example
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];
  // Find all tab panes inside the provided element
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    // Find the grid of cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> direct child of the grid
    Array.from(grid.children).forEach((card) => {
      if (card.tagName !== 'A') return;
      // First cell: Image
      let img = card.querySelector('.utility-aspect-3x2 img');
      // Second cell: Text content (heading, description)
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('.paragraph-sm');
      // Some card variants (centered secondary) wrap heading/desc deeper
      if ((!heading || !desc) && card.querySelector('.utility-text-align-center')) {
        const inner = card.querySelector('.utility-text-align-center');
        heading = heading || inner.querySelector('h3, .h4-heading');
        desc = desc || inner.querySelector('.paragraph-sm');
      }
      // Compose text cell: heading (as element), then desc (as element)
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Always ensure two columns (image, text)
      cells.push([
        img || '',
        textCell.length ? textCell : ''
      ]);
    });
  });
  // Create and replace with new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
