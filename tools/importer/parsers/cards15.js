/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must match example exactly
  const headerRow = ['Cards (cards15)'];

  // Find all immediate card columns
  const cardDivs = Array.from(element.querySelectorAll(':scope > .parsys_column'));

  // For each card, extract image and all text content
  const rows = cardDivs.map(cardDiv => {
    // Image extraction
    const img = cardDiv.querySelector('img');

    // Text content extraction: get all content inside .textimage-text (includes heading, paragraphs, and CTA)
    let textCell = '';
    const textContentDiv = cardDiv.querySelector('.textimage-text');
    if (textContentDiv) {
      // Reference the full block for semantic resilience and completeness
      textCell = textContentDiv;
    }
    return [img, textCell];
  });

  // Compose cells array for the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
