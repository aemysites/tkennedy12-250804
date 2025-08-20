/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matches the example markdown
  const headerRow = ['Cards (cards37)'];

  // Find the primary cards grid (the first grid-layout child)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const rows = [headerRow];

  // Find all direct descendants that are either cards or nested grids
  const gridChildren = Array.from(grid.children);

  // First card: large left card
  const firstCard = gridChildren.find(child => child.matches('a.utility-link-content-block'));
  if (firstCard) {
    const imageWrapper = firstCard.querySelector('.utility-aspect-2x3');
    const img = imageWrapper ? imageWrapper.querySelector('img') : null;
    const title = firstCard.querySelector('h3, .h2-heading, .h4-heading');
    const desc = firstCard.querySelector('p');
    const cta = firstCard.querySelector('.button');
    const textContent = [];
    if (title) textContent.push(title);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    rows.push([
      img ? img : '',
      textContent
    ]);
  }

  // Nested grid for subsequent cards
  const nestedGrid = gridChildren.find(child => child.classList.contains('grid-layout'));
  if (nestedGrid) {
    const cardEls = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
    cardEls.forEach(card => {
      const imageWrapper = card.querySelector('.utility-aspect-1x1, .utility-aspect-2x3');
      const img = imageWrapper ? imageWrapper.querySelector('img') : null;
      const title = card.querySelector('h3, .h2-heading, .h4-heading');
      const desc = card.querySelector('p');
      const textContent = [];
      if (title) textContent.push(title);
      if (desc) textContent.push(desc);
      rows.push([
        img ? img : '',
        textContent
      ]);
    });
  }

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
