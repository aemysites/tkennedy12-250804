/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const rows = [['Cards (cards24)']];

  // Each card is an <a> element
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // Get image element (first <img> in the card)
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    let imgEl = imgDiv ? imgDiv.querySelector('img') : null;

    // Compose the text content
    // Tag and date row (if present)
    const tagRow = card.querySelector('.flex-horizontal');
    // Title (h3)
    const title = card.querySelector('h3');
    // We'll preserve the layout: tag/date on top, then h3

    // Create a container to keep the order and block structure
    const textCell = document.createElement('div');
    if (tagRow) {
      for (let child of tagRow.childNodes) {
        textCell.appendChild(child.cloneNode(true));
      }
      // Add a line break after tag/date row for clarity
      textCell.appendChild(document.createElement('br'));
    }
    if (title) {
      textCell.appendChild(title);
    }

    rows.push([
      imgEl,
      textCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
