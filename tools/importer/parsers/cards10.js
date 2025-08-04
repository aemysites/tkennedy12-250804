/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards10)'];
  const cells = [headerRow];

  // Get all top-level cards (direct <a> children)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach(card => {
    // Image is in the first child div (with class utility-aspect-3x2) inside <a>
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    const img = imageDiv ? imageDiv.querySelector('img') : null;

    // Text content is in .utility-padding-all-1rem
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (textContainer) {
      // Tag (optional, inside .tag-group .tag)
      const tag = textContainer.querySelector('.tag');
      if (tag) {
        textContent.push(tag);
      }
      // Heading (optional)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) {
        textContent.push(heading);
      }
      // Description (optional)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }

    // Each row: [image, text content]
    cells.push([
      img ? img : '',
      textContent.length > 0 ? textContent : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
