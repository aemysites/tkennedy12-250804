/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the example
  const headerRow = ['Cards (cards17)'];

  // Each card is a .utility-aspect-1x1 div with an image only; text cell should be truly empty, not a blank string
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  const rows = Array.from(cardDivs).map(div => {
    const img = div.querySelector('img');
    return [img]; // Only one cell per row: just the image, since there is no text content in the HTML
  });

  // The prompt example expects two columns: image | text, but input HTML provides only images, so we must output both columns for structural accuracy
  // To ensure two columns, the second cell should be an empty string (no text content)
  const finalRows = Array.from(cardDivs).map(div => {
    const img = div.querySelector('img');
    return [img, ''];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...finalRows
  ], document);
  element.replaceWith(table);
}
