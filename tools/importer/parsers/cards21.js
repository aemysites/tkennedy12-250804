/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards21) block
  const headerRow = ['Cards (cards21)'];

  // Find card container (works for the provided nested structure)
  // Robust for future cards: aggregate all .card-body elements under this block
  const cardBodies = element.querySelectorAll('.card-body');
  const rows = [headerRow];

  cardBodies.forEach(cardBody => {
    // Find the image: first <img> in the card
    const img = cardBody.querySelector('img');

    // Find the heading: .h4-heading (may be missing in other cards)
    const heading = cardBody.querySelector('.h4-heading');

    // Find supporting description (e.g., <p>, <div> after the heading, if present)
    // In this HTML, there is no description, but let's check for possible text after heading.
    const textContentElements = [];
    if (heading) textContentElements.push(heading);
    // Check for any description nodes after the heading
    let node = heading ? heading.nextSibling : cardBody.firstChild;
    while (node) {
      if (node.nodeType === 1 && node !== img) { // ELEMENT_NODE and not the image
        textContentElements.push(node);
      }
      node = node.nextSibling;
    }
    // Fallback: if only heading is present, that's fine
    // If heading is missing, try to use cardBody.textContent (shouldn't happen in this sample)

    rows.push([
      img,
      textContentElements.length ? textContentElements : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
