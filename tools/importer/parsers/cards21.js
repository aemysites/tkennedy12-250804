/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the table, exactly as in the example
  const headerRow = ['Cards (cards21)'];

  // Find all immediate or nested card bodies within the element
  // This supports multiple cards (multiple .card-body's)
  let cardBodies = element.querySelectorAll('.card-body');
  // If there's only one card and it's the element itself, make an array with the element
  if (cardBodies.length === 0 && element.classList.contains('card-body')) {
    cardBodies = [element];
  }

  // Compose rows for each card
  const cardRows = Array.from(cardBodies).map((cardBody) => {
    // Extract image (first <img> in card-body)
    const image = cardBody.querySelector('img');

    // Extract title: <div class="h4-heading"> or similar
    const heading = cardBody.querySelector('.h4-heading');
    let titleEl = null;
    if (heading) {
      // retain heading semantics if possible
      if (/^h[1-6]$/i.test(heading.tagName)) {
        titleEl = heading;
      } else {
        // If not a heading element, wrap in <strong>
        titleEl = document.createElement('strong');
        titleEl.textContent = heading.textContent;
      }
    }

    // Extract description (text nodes after heading, if present)
    const textCellContent = [];
    if (titleEl) textCellContent.push(titleEl);
    let foundHeading = false;
    Array.from(cardBody.childNodes).forEach((node) => {
      if (node === heading) {
        foundHeading = true;
        return;
      }
      if (!foundHeading) return;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textCellContent.push(p);
      } else if (node.nodeType === Node.ELEMENT_NODE && node !== image && node.textContent.trim()) {
        textCellContent.push(node);
      }
    });
    const textCell = textCellContent.length === 1 ? textCellContent[0] : textCellContent;
    return [image, textCell];
  });

  // Compose the table rows: header + all cards
  const tableRows = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
