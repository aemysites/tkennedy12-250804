/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example exactly
  const headerRow = ['Accordion'];
  const rows = [];

  // Select all accordion items (immediate children with .cmp-accordion__item)
  const items = element.querySelectorAll('.cmp-accordion__item');
  items.forEach(item => {
    // Title cell: get the title span from the button
    const button = item.querySelector('.cmp-accordion__header .cmp-accordion__button');
    let titleCell;
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      titleCell = titleSpan ? titleSpan : document.createTextNode('');
    } else {
      titleCell = document.createTextNode('');
    }

    // Content cell: get EVERYTHING inside the panel
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell;
    if (panel) {
      // Collect all direct children of panel (container, etc).
      // Filter out empty text nodes
      const contents = Array.from(panel.childNodes).filter(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim().length > 0;
        }
        return true;
      });
      // If only one node, use it directly, else array
      contentCell = contents.length === 1 ? contents[0] : contents;
    } else {
      contentCell = document.createTextNode('');
    }

    rows.push([titleCell, contentCell]);
  });

  // Final structure: header, then each accordion item as [title, content]
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
