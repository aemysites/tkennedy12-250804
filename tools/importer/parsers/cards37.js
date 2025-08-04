/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image (first img element in card, including nested divs)
  function extractImage(card) {
    return card.querySelector('img');
  }

  // Helper to extract text content for a card: heading, paragraph(s), button/cta
  function extractText(card) {
    const result = [];
    // Prefer h2, fallback to h3/h4/h5/h6 for title
    const heading = card.querySelector('h2, h3, h4, h5, h6');
    if (heading) result.push(heading);
    // Find all p tags
    card.querySelectorAll('p').forEach((p) => {
      result.push(p);
    });
    // Call to action: div.button, a.button, or button.button
    const cta = card.querySelector('a.button, button.button, div.button');
    if (cta) result.push(cta);
    return result;
  }

  // Find the main grid block: section > div.container > div.grid-layout
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Cards: direct links or nested grids
  let cardElements = [];
  // Find first-level children.
  mainGrid.childNodes.forEach(child => {
    if (child.nodeType !== 1) return;
    if (child.matches('a.utility-link-content-block')) {
      cardElements.push(child);
    } else if (child.classList.contains('grid-layout')) {
      // Nested grid, may also contain cards
      child.querySelectorAll('a.utility-link-content-block').forEach(a => {
        cardElements.push(a);
      });
    }
  });

  // Build the rows: header first, then each card
  const rows = [['Cards (cards37)']];
  cardElements.forEach(card => {
    const img = extractImage(card);
    const text = extractText(card);
    // Only include cells that are not null/undefined
    rows.push([
      img || '',
      text.length === 1 ? text[0] : text
    ]);
  });

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the target element with the new table
  element.replaceWith(table);
}
