/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Cards (cards10)'];
  const cells = [headerRow];

  // Each card is an <a> child of element
  const cardLinks = element.querySelectorAll(':scope > a');
  cardLinks.forEach(card => {
    // First cell: image (always present)
    let image = null;
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    if (imageDiv) {
      image = imageDiv.querySelector('img');
    }

    // Second cell: text content
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    const textCellEls = [];
    if (contentDiv) {
      // Tag (optional)
      const tagDiv = contentDiv.querySelector('.tag-group');
      if (tagDiv) {
        // All tags in this tag-group
        const tags = Array.from(tagDiv.querySelectorAll('.tag'));
        if (tags.length > 0) {
          // Wrap tags in a fragment
          tags.forEach(tag => {
            textCellEls.push(tag);
          });
          textCellEls.push(document.createElement('br'));
        }
      }
      // Heading (h3 or .h4-heading)
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textCellEls.push(heading);
      }
      // Description (paragraph)
      const desc = contentDiv.querySelector('p');
      if (desc) {
        textCellEls.push(desc);
      }
    }
    // Only add non-null image and non-empty text cells
    cells.push([
      image || '',
      textCellEls.length > 0 ? textCellEls : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
