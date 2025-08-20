/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Cards (cardsNoImages3)'];
  const cells = [headerRow];

  // Find the most likely container for the cards
  // Handles both direct children and nested cmp-container structures
  let cardComponents = [];
  const cmpContainer = element.querySelector('.cmp-container');
  if (cmpContainer) {
    cardComponents = cmpContainer.querySelectorAll('.text-component');
  } else {
    cardComponents = element.querySelectorAll('.text-component');
  }
  // If none found, fallback to all .text.parbase.section blocks
  if (!cardComponents.length) {
    let wrappers = element.querySelectorAll('.text.parbase.section');
    wrappers.forEach(wrapper => {
      let tc = wrapper.querySelector('.text-component');
      if(tc) cardComponents = [...cardComponents, tc];
    });
  }
  // As last resort, look for all h3s and their parents
  if (!cardComponents.length) {
    let h3s = element.querySelectorAll('h3');
    h3s.forEach(h3 => {
      if (h3.parentElement && h3.parentElement !== element) {
        cardComponents = [...cardComponents, h3.parentElement];
      }
    });
  }

  // For each card, reference the block of content (all children of .text-component)
  cardComponents.forEach(card => {
    // Defensive: skip if empty/hidden
    if (!card.textContent || !card.textContent.trim()) return;
    cells.push([card]);
  });

  // Do not replace if no card rows (header only)
  if (cells.length <= 1) return;

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
