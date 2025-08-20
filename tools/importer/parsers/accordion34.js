/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as specified
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Find all accordion sections (direct children)
  const accordions = element.querySelectorAll(':scope > .accordion');
  accordions.forEach((accordion) => {
    // Title: usually inside .w-dropdown-toggle > .paragraph-lg
    let title = '';
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) title = titleDiv;
    }
    // Content: nav.accordion-content > first div (holds .rich-text)
    let content = '';
    const nav = accordion.querySelector('nav.accordion-content');
    if (nav) {
      // Use all children of nav (usually a single .utility-padding-all-1rem)
      // Reference the div, not clone
      const firstDiv = nav.querySelector(':scope > div');
      if (firstDiv) content = firstDiv;
    }
    rows.push([title || '', content || '']);
  });
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
