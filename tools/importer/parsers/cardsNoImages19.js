/* global WebImporter */
export default function parse(element, { document }) {
  // Block header matches example
  const headerRow = ['Cards (cardsNoImages19)'];
  const cells = [headerRow];

  // Defensive: find the section and its content container
  const section = element.querySelector('section');
  if (!section) return;
  const parsys = section.querySelector('.parsys.sectionpar');
  if (!parsys) return;

  // Each .text.parbase.section represents a card; ensure we reference existing elements
  const cardBlocks = Array.from(parsys.children).filter(child => child.classList.contains('text'));

  // For each card, include its .text-component div as the sole cell in the row
  cardBlocks.forEach(cardBlock => {
    const textComponent = cardBlock.querySelector('.text-component');
    if (textComponent && (textComponent.textContent.trim() || textComponent.querySelector('a'))) {
      // Defensive: Only include non-empty cards
      cells.push([textComponent]);
    }
  });

  // Create the table using referenced elements
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace in DOM
  element.replaceWith(table);
}
