/* global WebImporter */
export default function parse(element, { document }) {
  // Header for the table as per block specification
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Each card is a direct child <div> with an <img> and (optionally) text
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  cards.forEach(card => {
    // Find the first image in the card
    const img = card.querySelector('img');
    // Find the text content area (h3 and p grouped)
    let textCell = null;
    const textWrap = card.querySelector('.utility-padding-all-2rem');
    if (textWrap) {
      // We want to preserve heading and paragraph, and any present structure
      // Reference existing elements from the document, do not clone
      const textNodes = [];
      const h3 = textWrap.querySelector('h3');
      const p = textWrap.querySelector('p');
      if (h3) textNodes.push(h3);
      if (p) textNodes.push(p);
      // If both are missing, textCell stays null
      if (textNodes.length > 0) textCell = textNodes;
    }
    // Push rows following the 2-column structure: [img, text]
    // If only image, second cell is blank
    // If only text, first cell is blank
    if (img && textCell) {
      rows.push([img, textCell]);
    } else if (img) {
      rows.push([img, '']);
    } else if (textCell) {
      rows.push(['', textCell]);
    }
    // If neither, skip (should not happen)
  });

  // Replace original element with created table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
