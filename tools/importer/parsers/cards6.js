/* global WebImporter */
export default function parse(element, { document }) {
  // Find all three card columns (robust selector)
  const cols = Array.from(element.querySelectorAll('.pwccol3-longform > .parsys_column'));
  const rows = [
    ['Cards (cards6)']
  ];

  cols.forEach((col) => {
    // 1. Find image: either <img> or video poster image
    let img = col.querySelector('img');
    if (!img) {
      const poster = col.querySelector('.vjs-poster img');
      if (poster) img = poster;
    }

    // 2. Find a single block containing all card text (use most generic upper text container)
    // Prefer .text-component, fallback to .text.parbase.section or just col
    let textBlock = col.querySelector('.text-component');
    if (!textBlock) {
      const section = col.querySelector('.text.parbase.section');
      if (section) {
        // Use the section but remove the first empty child <div> if present
        let real = Array.from(section.children).find(c => c.classList.contains('text-component')) || section;
        textBlock = real;
      } else {
        textBlock = col;
      }
    }

    // Reference the existing text block, but remove empty wrappers if present
    let textContent = textBlock;
    // Don't output empty columns
    if (img || (textContent && textContent.textContent.trim())) {
      rows.push([
        img || '',
        textContent || ''
      ]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
