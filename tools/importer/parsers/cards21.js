/* global WebImporter */
export default function parse(element, { document }) {
  // Table header for Cards (cards21)
  const headerRow = ['Cards (cards21)'];

  // Find the card body containing the card content
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    cardBody = element.querySelector('div');
  }

  // Get the image for the first cell
  const img = cardBody ? cardBody.querySelector('img') : null;

  // Build the text column: heading and all siblings after, as in the example
  const textCell = [];
  if (cardBody) {
    // Find heading (various selectors)
    let heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
    if (heading) textCell.push(heading);
    // Add all elements after the heading (descriptions, CTA, etc)
    let foundHeading = false;
    cardBody.childNodes.forEach((node) => {
      if (node === heading) {
        foundHeading = true;
        return;
      }
      if (foundHeading && node.nodeType === 1 && node !== img) {
        textCell.push(node);
      }
    });
  }

  const row = [img, textCell];
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}
