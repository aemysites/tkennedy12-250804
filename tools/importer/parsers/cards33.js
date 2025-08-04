/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row as specified
  const headerRow = ['Cards (cards33)'];

  // Each card is a direct child <a> of the main grid container
  const cardAnchors = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardAnchors.map((cardAnchor) => {
    // Image is always present and is the first <img> in each card
    const img = cardAnchor.querySelector('img');

    // The text content is the second main block inside the card structure
    // It is always the first <div> sibling of the <img>, inside the grid layout div
    let textDiv;
    const mainGrid = cardAnchor.querySelector('.w-layout-grid');
    if (mainGrid) {
      // Find the <div> that is NOT the <img>
      const children = Array.from(mainGrid.children);
      textDiv = children.find((node) => node.tagName === 'DIV');
    }
    // Fallback: use the cardAnchor itself if structure varies
    if (!textDiv) textDiv = cardAnchor;

    return [img, textDiv];
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
