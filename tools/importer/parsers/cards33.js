/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per instructions
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];
  // Find all top-level cards (each <a> inside element)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Card contents: image and text
    // Get the first image under the grid layout in the card
    const cardGrid = card.querySelector(':scope > div');
    let img = cardGrid ? cardGrid.querySelector('img') : null;
    // Text container is the div after image
    let textDiv = null;
    if (cardGrid) {
      // Find all child divs, usually first is for image, second for text
      const divs = cardGrid.querySelectorAll(':scope > div');
      if (divs.length) {
        // Generally last div holds the text
        textDiv = divs[divs.length - 1];
      }
    }
    // Build a fragment for text cell
    const frag = document.createDocumentFragment();
    if (textDiv) {
      // Optional: tag and read time (typically a flex row)
      const meta = textDiv.querySelector('.flex-horizontal');
      if (meta) frag.appendChild(meta);
      // Heading (h3/h4)
      const heading = textDiv.querySelector('h3, .h4-heading, h4, h2');
      if (heading) frag.appendChild(heading);
      // Description paragraph
      const desc = textDiv.querySelector('p');
      if (desc) frag.appendChild(desc);
      // CTA: look for last div with 'Read', after the <p>
      // Only include the CTA as a link if it exists
      const ctaDivs = Array.from(textDiv.querySelectorAll(':scope > div'));
      const ctaDiv = ctaDivs.find(d => d.textContent.trim().toLowerCase() === 'read');
      if (ctaDiv) {
        const link = document.createElement('a');
        link.href = card.getAttribute('href') || '#';
        link.textContent = ctaDiv.textContent.trim();
        frag.appendChild(link);
      }
    }
    // Add row: [image, text content]
    // If no image, put empty string (should not happen in this block)
    rows.push([
      img || '',
      frag
    ]);
  });
  // Build table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
