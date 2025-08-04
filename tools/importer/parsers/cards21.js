/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards21)'];

  // Defensive: Ensure we have the expected card body
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image
  const img = cardBody.querySelector('img');

  // Find the heading/title (may be missing)
  const title = cardBody.querySelector('.h4-heading');

  // Compose the text cell: should be an array of existing elements
  const textCell = [];
  if (title) textCell.push(title);
  // No description or CTA present in this HTML, but in general we could extract more if present

  // Each card row: Image in the first cell, text content in the second cell
  const cardRow = [img, textCell.length ? textCell : ''];

  // Compose the final table structure
  const cells = [headerRow, cardRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
