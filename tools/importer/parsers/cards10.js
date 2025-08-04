/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example, exactly matching: 'Cards (cards10)'
  const headerRow = ['Cards (cards10)'];

  // Find all direct <a> children: each is a card
  const cardAnchors = element.querySelectorAll(':scope > a.card-link');

  const rows = [];

  cardAnchors.forEach((card) => {
    // Extract the first img (image is always present)
    const img = card.querySelector('img.card-image');

    // Extract the textual content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Defensive: If textContainer is missing, fallback to fallback div, else empty span
    let textCell = textContainer;
    if (!textCell) {
      // fallback to card itself if no textContainer (should not happen for this block)
      textCell = document.createElement('span'); // empty fallback
    }
    rows.push([img, textCell]);
  });

  // Compose table rows
  const tableArray = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace original element with the block table
  element.replaceWith(block);
}
