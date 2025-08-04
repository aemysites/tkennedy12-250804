/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];
  // Find all tab panes (each contains a grid of cards)
  const panes = element.querySelectorAll('[class*="w-tab-pane"]');
  panes.forEach((pane) => {
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each direct child of the grid is a card anchor
    const cards = Array.from(grid.children).filter((child) => child.tagName === 'A');
    cards.forEach((card) => {
      // Image: first img element in the card
      let imgEl = card.querySelector('img');
      // Text: try to find a heading and its description
      let textCell = document.createElement('div');
      // Try to find the title
      let title = card.querySelector('h3, .h4-heading');
      if (title) textCell.appendChild(title);
      // Try to find the description
      let desc = card.querySelector('.paragraph-sm');
      if (desc) textCell.appendChild(desc);
      // Make sure at least something is added
      if (!title && !desc) {
        // fallback: use entire card minus image if available
        Array.from(card.childNodes).forEach((node) => {
          if (!imgEl || !imgEl.contains(node)) textCell.appendChild(node);
        });
      }
      rows.push([
        imgEl ? imgEl : '',
        textCell.childNodes.length > 0 ? textCell : ''
      ]);
    });
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
