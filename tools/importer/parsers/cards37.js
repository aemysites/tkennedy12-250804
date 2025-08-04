/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing all cards
  const container = element.querySelector('.container');
  if (!container) return;
  // The first grid-layout is the top-level, which may contain nested grid-layouts for right/bottom columns
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Helper to extract all immediate card elements from mainGrid and any nested grid-layouts
  function extractCardsFromGrid(grid) {
    const cards = [];
    grid.childNodes.forEach((node) => {
      if (node.nodeType !== 1) return;
      if (node.classList.contains('utility-link-content-block')) {
        cards.push(node);
      } else if (node.classList.contains('grid-layout')) {
        // Recursively extract cards from nested grids
        cards.push(...extractCardsFromGrid(node));
      }
    });
    return cards;
  }

  const cardEls = extractCardsFromGrid(mainGrid);

  // Helper: for each card, extract [image, [heading, description, cta]]
  function getCardRow(cardEl) {
    // Find image: always inside a .utility-aspect-2x3 or .utility-aspect-1x1
    let imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgContainer ? imgContainer.querySelector('img') : null;
    let imgCell = img || '';

    // For the big left card, info is in .utility-padding-all-2rem, for others at cardEl top-level
    let textBlock = cardEl.querySelector('.utility-padding-all-2rem') || cardEl;
    // Heading: h2 or h3 or .h4-heading
    let heading = textBlock.querySelector('h2, h3, .h4-heading');
    // Description: first <p>
    let desc = textBlock.querySelector('p');
    // CTA: .button or a.button (optional)
    let cta = textBlock.querySelector('.button, a.button');
    // Collect all non-null elements in order: heading, desc, cta
    const textParts = [];
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    if (cta) textParts.push(cta);
    let textCell = textParts.length === 1 ? textParts[0] : textParts;
    return [imgCell, textCell];
  }

  // Build rows: header, then one row per card
  const rows = [];
  rows.push(['Cards (cards37)']);
  cardEls.forEach(card => {
    rows.push(getCardRow(card));
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
