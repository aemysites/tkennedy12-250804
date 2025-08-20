/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the block name
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each card is a direct <a> child of the grid
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach(card => {
    // Image: find the <img> inside the first div.utility-aspect-2x3
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    let image = null;
    if (imageDiv) {
      image = imageDiv.querySelector('img');
    }
    // Text content (tag/date and heading)
    const textContent = [];
    // Tag + date
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) textContent.push(tagRow);
    // Heading
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) textContent.push(heading);
    // Add the row if at least image and heading exist (robust to missing fields)
    rows.push([
      image,
      textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
