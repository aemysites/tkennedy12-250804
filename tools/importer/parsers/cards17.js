/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as specified
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Get all card blocks: direct children of '.parsys' with class 'textimage text section'
  const cardNodes = Array.from(element.querySelectorAll('.parsys > .textimage.text.section'));

  cardNodes.forEach(card => {
    // First column: image (mandatory)
    const img = card.querySelector('.textimage-image img');
    // Reference the existing image element if present
    const imageEl = img ? img : '';

    // Second column: text block
    const textComponent = card.querySelector('.textimage-text .text-component');
    const cellElements = [];
    if (textComponent) {
      // Grab all <p> elements in the text component
      const ps = textComponent.querySelectorAll('p');
      // Title: if first <p> contains a link, use the link text as heading (simulate <strong>)
      if (ps.length > 0) {
        const firstP = ps[0];
        const firstLink = firstP.querySelector('a');
        if (firstLink) {
          // Make a <strong> element, but reference the link itself from the DOM
          const strong = document.createElement('strong');
          strong.appendChild(firstLink);
          cellElements.push(strong);
        }
      }
      // Description: use second <p> if present, else just first <p> if not a link
      if (ps.length > 1) {
        cellElements.push(ps[1]);
      } else if (ps.length === 1) {
        // If first <p> did not have a link, add it as description
        const firstLink = ps[0].querySelector('a');
        if (!firstLink) {
          cellElements.push(ps[0]);
        }
      }
    }
    // Push the row, referencing existing image and text elements
    rows.push([
      imageEl,
      cellElements.length ? cellElements : ''
    ]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
