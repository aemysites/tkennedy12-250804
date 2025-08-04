/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table rows array
  const rows = [];
  // Header row from the example (must be exact)
  rows.push(['Accordion (accordion34)']);

  // Find all accordion items (should be immediate children with class 'accordion')
  const items = element.querySelectorAll(':scope > .accordion');

  items.forEach((item) => {
    // Title cell: element inside .w-dropdown-toggle with class .paragraph-lg
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const paragraphLg = toggle.querySelector('.paragraph-lg');
      if (paragraphLg) {
        titleCell = paragraphLg;
      } else {
        // fallback: use toggle itself if .paragraph-lg missing
        titleCell = toggle;
      }
    }
    // Content cell: find the content inside nav.accordion-content
    let contentCell = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // Look for .rich-text, else use the first meaningful descendant
      let found = null;
      // Check for a .rich-text descendant
      found = nav.querySelector('.rich-text');
      if (!found) {
        // fallback: use the nav's first child with content
        for (const child of nav.children) {
          if (child.textContent.trim()) {
            found = child;
            break;
          }
        }
        if (!found && nav.textContent.trim()) {
          found = nav;
        }
      }
      contentCell = found || nav;
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table block
  element.replaceWith(table);
}
