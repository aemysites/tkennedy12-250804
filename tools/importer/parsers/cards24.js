/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const headerRow = ['Cards (cards24)'];
  // Select all card <a> elements directly under the input element
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // First cell: the image inside the card, within its own container div
    let imgCell = null;
    const aspectDiv = card.querySelector('div.utility-aspect-2x3');
    if (aspectDiv) {
      imgCell = aspectDiv;
    } else {
      // fallback: get first image if div not found
      const img = card.querySelector('img');
      if (img) imgCell = img;
    }

    // Second cell: includes tag/date, and h3 (title)
    // Compose as: tag-date row (flex), followed by h3 (heading)
    const contentCell = [];
    // Tag/date row
    const metaRow = card.querySelector('div.flex-horizontal');
    if (metaRow) {
      contentCell.push(metaRow);
    }
    // Heading/title
    const heading = card.querySelector('h3');
    if (heading) {
      contentCell.push(heading);
    }
    return [imgCell, contentCell];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
