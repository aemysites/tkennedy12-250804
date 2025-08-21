/* global WebImporter */
export default function parse(element, { document }) {
  // Header must be exactly as in the example
  const headerRow = ['Cards (cards26)'];
  
  // Find all card elements (direct children with .textimage.text.section)
  const cardEls = element.querySelectorAll('.textimage.text.section');
  const rows = [];
  
  cardEls.forEach((cardEl) => {
    // 1. Image cell (first img inside .textimage-image)
    let imgElem = null;
    const imageContainer = cardEl.querySelector('.textimage-image img');
    if (imageContainer) {
      imgElem = imageContainer;
    }

    // 2. Text cell (all children of .text-component)
    let textCell = null;
    const textComp = cardEl.querySelector('.text-component');
    if (textComp) {
      // Use document fragment to directly reference all children (preserving structure)
      if (textComp.childNodes.length === 1 && textComp.childNodes[0].nodeType === Node.ELEMENT_NODE) {
        // Only one child, use the element directly
        textCell = textComp.childNodes[0];
      } else {
        // Multiple children, use a fragment
        const frag = document.createDocumentFragment();
        Array.from(textComp.childNodes).forEach(node => {
          frag.appendChild(node);
        });
        textCell = frag;
      }
    }
    rows.push([imgElem, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
