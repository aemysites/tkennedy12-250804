/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each card is an <a> child of the main grid
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // Image: always inside a <div> near the top, contains <img>
    const imgDiv = card.querySelector('div.utility-aspect-2x3');
    const imgEl = imgDiv ? imgDiv.querySelector('img') : null;

    // Text content: tag/date and title
    // Wrap the tag/date row and the title as they are in the card
    const contentFragment = document.createDocumentFragment();
    const metaDiv = card.querySelector('div.flex-horizontal');
    if (metaDiv) contentFragment.appendChild(metaDiv);
    const title = card.querySelector('h3');
    if (title) contentFragment.appendChild(title);

    rows.push([
      imgEl,
      contentFragment
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
