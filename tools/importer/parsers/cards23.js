/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in markdown example
  const cells = [['Cards (cards23)']];

  // Find all .w-tab-pane elements (tabs)
  const tabPanes = element.querySelectorAll('[class*="w-tab-pane"]');

  tabPanes.forEach((tabPane) => {
    // Each tab contains a grid of cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is a direct <a> child
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // --- IMAGE CELL ---
      // Prefer .utility-aspect-3x2 img, fallback to first img
      let img = null;
      const aspectBox = card.querySelector('.utility-aspect-3x2');
      if (aspectBox) {
        img = aspectBox.querySelector('img');
      }
      if (!img) {
        img = card.querySelector('img');
      }
      // Only reference existing node, do not clone or create
      let imgCell = img ? img : '';

      // --- TEXT CELL ---
      // Try to get heading: find h3 or element with .h4-heading
      let heading = card.querySelector('h3, .h4-heading');
      // Some card headings are inside .utility-text-align-center
      if (!heading) {
        const txtAlign = card.querySelector('.utility-text-align-center');
        if (txtAlign) {
          heading = txtAlign.querySelector('h3, .h4-heading');
        }
      }

      // Get description: .paragraph-sm
      let desc = card.querySelector('.paragraph-sm');
      if (!desc) {
        // Some are nested in .utility-text-align-center
        const txtAlign = card.querySelector('.utility-text-align-center');
        if (txtAlign) {
          desc = txtAlign.querySelector('.paragraph-sm');
        }
      }

      // Compose text cell: heading above description
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // If no heading/desc found, use textContent
      if (!heading && !desc) {
        textCell.push(document.createTextNode(card.textContent.trim()));
      }

      cells.push([
        imgCell, // image cell
        textCell.length === 1 ? textCell[0] : textCell // text cell (single or array)
      ]);
    });
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
