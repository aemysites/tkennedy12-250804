/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matching the specification
  const rows = [['Cards (cards16)']];

  // Get all immediate card blocks
  const cardNodes = Array.from(element.querySelectorAll('.parsys > .textimage'));

  cardNodes.forEach(card => {
    // First cell: the image (reference the existing img element)
    const img = card.querySelector('.textimage-image img');

    // Second cell: composite text block
    // Grab the .text-component div (contains heading, description, cta)
    const textDiv = card.querySelector('.textimage-text .text-component');

    // Only push rows if both parts exist
    if (img && textDiv) {
      rows.push([img, textDiv]);
    }
  });

  // Create and replace with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}