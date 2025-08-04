/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table rows array
  const rows = [];
  // Header row: single cell with the block name
  rows.push(['Accordion (accordion34)']);

  // Find all direct accordions
  const accordions = element.querySelectorAll(':scope > .accordion');

  accordions.forEach(acc => {
    // Title: .w-dropdown-toggle > .paragraph-lg (fallback to toggle if not found)
    let titleElem = null;
    const toggle = acc.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleElem = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: .accordion-content > .utility-padding-all-1rem > .w-richtext (fallback to nav if not found)
    let contentElem = null;
    const nav = acc.querySelector('.accordion-content');
    if (nav) {
      const utilityDiv = nav.querySelector('div');
      if (utilityDiv) {
        contentElem = utilityDiv.querySelector('.w-richtext') || utilityDiv;
      } else {
        contentElem = nav;
      }
    }

    if (titleElem && contentElem) {
      rows.push([titleElem, contentElem]);
    }
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
