/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards33)'];
  // Select all direct <a> children; each represents a card
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cardLinks.map(card => {
    // Find the image (mandatory, used as first cell)
    const img = card.querySelector('img');
    // Find the content block (mandatory, used as second cell)
    // The structure is: <a><div.grid-layout><img/><div>...</div></div></a>
    // We want the div inside the grid after the img
    const gridDiv = card.querySelector('div.w-layout-grid');
    if (!img || !gridDiv) {
      // If missing required structure, fallback to empty cells
      return ['', ''];
    }
    // Gather all direct children after the img, for text cell
    const children = Array.from(gridDiv.children);
    // Typically, img is children[0], text is children[1]
    let textCell = null;
    if (children.length > 1) {
      textCell = children[1];
    } else {
      // fallback to first div after img, or gridDiv itself
      textCell = gridDiv.querySelector('div') || gridDiv;
    }
    // Defensive: make sure we reference the actual element, not its clone or HTML string
    return [img, textCell];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
