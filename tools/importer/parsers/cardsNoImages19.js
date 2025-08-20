/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as in the example
  const headerRow = ['Cards (cardsNoImages19)'];
  const cells = [headerRow];

  // Find the parsys container for cards
  const parsys = element.querySelector('.parsys.sectionpar');
  if (!parsys) return;

  // Each card block is a .text.parbase.section with .text-component inside
  // The first .text.parbase.section is a heading, skip it
  const cardSections = Array.from(parsys.children).filter(
    (child, idx) => {
      // Only want .text.parbase.section
      if (!child.classList.contains('text') || !child.querySelector('.text-component')) return false;
      // Skip the first which is only the section heading
      // We check for heading by looking for h2 and only that
      const tc = child.querySelector('.text-component');
      if (tc.querySelector('h2')) return false;
      return true;
    }
  );

  // For each card section, reference its .text-component directly
  cardSections.forEach((section) => {
    const textComponent = section.querySelector('.text-component');
    if (textComponent && textComponent.textContent.trim().length > 0) {
      // Use the existing .text-component (do not clone)
      cells.push([textComponent]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
