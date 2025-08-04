/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the example
  const cells = [['Cards']];
  // Get all direct child divs (each is a card)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Each card has a <p class="utility-margin-bottom-0"> containing the card text
    const p = cardDiv.querySelector('p');
    if (p) {
      cells.push([p]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
