/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block expects each card as a row, with the header row first
  const headerRow = ['Cards'];
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cards.map((card) => {
    // Each 'card' is a flex-horizontal block, containing:
    // an icon (can be omitted), and a <p> (the text), both as direct/indirect children
    // Get the <p> with the text, we want to preserve the whole <p> element for reference
    const content = card.querySelector('p');
    // Edge case: skip row if <p> is missing
    if (!content) return null;
    return [content];
  }).filter(Boolean); // Remove any null entries (in case of missing <p>)
  if (rows.length === 0) {
    // If for some reason no cards, do not replace
    return;
  }
  const tableArr = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(block);
}