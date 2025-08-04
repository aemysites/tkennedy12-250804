/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified in the requirements
  const cells = [['Accordion (accordion34)']];

  // Get all immediate accordion blocks inside the element
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordions.forEach(accordion => {
    // Title: find the toggle label (usually a div with .paragraph-lg)
    let titleElem = accordion.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!titleElem) {
      // fallback: find first child div after icon
      const toggle = accordion.querySelector('.w-dropdown-toggle');
      if (toggle) {
        // skip the icon, use the next child div
        const icon = toggle.querySelector('.dropdown-icon');
        const children = Array.from(toggle.children);
        let afterIcon = false;
        for (const child of children) {
          if (afterIcon && child.tagName === 'DIV') {
            titleElem = child;
            break;
          }
          if (child === icon) afterIcon = true;
        }
      }
    }
    // Content: rich text block inside accordion-content
    let contentElem = accordion.querySelector('.accordion-content .w-richtext');
    if (!contentElem) {
      const nav = accordion.querySelector('.accordion-content');
      // fallback: find first div inside nav
      if (nav) {
        contentElem = nav.querySelector('div');
      }
    }
    // Fallback: if still not found use the accordion-content itself
    if (!contentElem) {
      contentElem = accordion.querySelector('.accordion-content');
    }

    cells.push([
      titleElem || '',
      contentElem || ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
