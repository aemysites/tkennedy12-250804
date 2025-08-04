/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the cards
  // The overall structure is: section > div.container > div.w-layout-grid.grid-layout
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The first child is the large card (an <a>), the next is a nested grid with more cards
  const topLevelChildren = Array.from(mainGrid.children);
  let cardRows = [];

  // Helper to assemble the text cell
  function buildTextCell(cardAnchor) {
    const textElements = [];
    // h2, h3, or h4 heading
    const heading = cardAnchor.querySelector('h2, h3, h4');
    if (heading) textElements.push(heading);
    // first paragraph
    const paragraph = cardAnchor.querySelector('p');
    if (paragraph) textElements.push(paragraph);
    // CTA button or element
    const cta = cardAnchor.querySelector('.button');
    if (cta) textElements.push(cta);
    return textElements;
  }

  // First big card
  const bigCardAnchor = topLevelChildren.find(
    (el) => el.matches('a.utility-link-content-block')
  );
  if (bigCardAnchor) {
    // Image is inside a div in the anchor
    const img = bigCardAnchor.querySelector('img');
    // Text content
    const textCell = buildTextCell(bigCardAnchor);
    cardRows.push([img, textCell]);
  }

  // Nested grid for the other cards
  const nestedGrid = topLevelChildren.find(
    (el) => el.classList.contains('w-layout-grid')
  );
  if (nestedGrid) {
    // Each card is an anchor
    const smallCardAnchors = Array.from(
      nestedGrid.querySelectorAll('a.utility-link-content-block')
    );
    for (const cardAnchor of smallCardAnchors) {
      const img = cardAnchor.querySelector('img');
      const textCell = buildTextCell(cardAnchor);
      cardRows.push([img, textCell]);
    }
  }

  // Table header
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow, ...cardRows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
