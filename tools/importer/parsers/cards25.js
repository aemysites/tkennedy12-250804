/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row matching the block name and variant
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Collect all direct child divs (each card is a direct child div)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach((cardDiv) => {
    // Find the image for the card (first <img> descendant)
    const img = cardDiv.querySelector('img');

    // Find card text content: look for a div containing h1-h6 or p (for title and description)
    let textContent = '';
    const textDiv = Array.from(cardDiv.querySelectorAll('div')).find(div => div.querySelector('h1,h2,h3,h4,h5,h6,p'));
    if (textDiv) {
      textContent = textDiv;
    }
    // If no text div, leave second cell empty

    // Add to rows only if image exists (as per the Cards block definition)
    if (img) {
      rows.push([img, textContent || '']);
    }
  });

  // Build the block table using the provided helper
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
