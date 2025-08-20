/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table header as per the block name
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];
  // Get all direct child <a> elements (each representing a card)
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // First cell: the image (must be an <img> element)
    const img = card.querySelector('img');
    // Second cell: all content except the img
    // The text block is the inner grid's second <div>
    const innerGrid = card.querySelector('.w-layout-grid');
    let textContentDiv = null;
    if (innerGrid) {
      const gridDivs = innerGrid.querySelectorAll(':scope > div');
      // The second div in the grid is the content
      if (gridDivs.length > 1) {
        textContentDiv = gridDivs[1];
      } else if (gridDivs.length === 1) {
        textContentDiv = gridDivs[0];
      }
    }
    // Fallback: get the last div inside the card if structure changes
    if (!textContentDiv) {
      const divs = card.querySelectorAll('div');
      if (divs.length) {
        textContentDiv = divs[divs.length - 1];
      }
    }
    // Defensive: if no img or textContentDiv, skip this card
    if (!img || !textContentDiv) return;
    rows.push([
      img,
      textContentDiv
    ]);
  });
  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
