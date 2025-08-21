/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must match example exactly
  const headerRow = ['Cards (cards12)'];
  // Each article is a card
  const cards = Array.from(element.querySelectorAll(':scope > article'));
  // Build the rows for the block table
  const rows = cards.map(card => {
    // Link wraps everything in each card
    const link = card.querySelector('a');
    // Image is mandatory
    const img = link.querySelector('img');
    // Heading (title)
    const heading = link.querySelector('h3');
    // Description/abstract
    const abstract = link.querySelector('p');

    // Compose text content: heading in <strong>, description below
    const textContent = [];
    if (heading) {
      // Use heading element directly for semantic meaning, but apply <strong> for bold as in example
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent;
      textContent.push(strong);
    }
    if (abstract) {
      textContent.push(document.createTextNode(' ')); // spacing like example
      textContent.push(abstract);
    }
    // No explicit CTA in source; entire card is a link
    // Structure: [image, combined text cell]
    return [img, textContent];
  });
  // Build final table with header and rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace original element
  element.replaceWith(table);
}
