/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Helper to create the text content cell for a card
  function createTextCell(cardDiv) {
    // Pick only the first heading and first paragraph in the card's text wrapper
    const heading = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');
    const description = cardDiv.querySelector('p');
    const parts = [];
    if (heading) parts.push(heading);
    if (description) parts.push(description);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0];
    return parts;
  }

  // Each immediate child div is a card (may have just image or image+text)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(cardDiv => {
    // Find the first image in the cardDiv
    const img = cardDiv.querySelector('img');

    // Determine if there is a heading or paragraph in the cardDiv
    const hasText = !!cardDiv.querySelector('h1, h2, h3, h4, h5, h6, p');

    if (img && hasText) {
      // Both image and text
      const textCell = createTextCell(cardDiv);
      cells.push([img, textCell]);
    } else if (img) {
      // Just image
      cells.push([img, '']);
    }
    // If no image, skip this card as per block definition
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
