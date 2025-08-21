/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match example exactly
  const headerRow = ['Accordion'];
  const rows = [];

  // Select all accordion items
  const items = element.querySelectorAll('.cmp-accordion__item');
  items.forEach((item) => {
    // Get the title cell, which should be the text inside .cmp-accordion__title
    let titleSpan = item.querySelector('.cmp-accordion__title');
    let titleCell;
    if (titleSpan) {
      // Reference the actual span element (do not clone)
      titleCell = titleSpan;
    } else {
      // Fallback: get text from button
      const button = item.querySelector('.cmp-accordion__button');
      titleCell = document.createElement('span');
      titleCell.textContent = button ? button.textContent.trim() : '';
    }

    // Get the content cell: everything INSIDE the panel
    let panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell;
    if (panel) {
      // Find the content area inside the panel
      // Usually inside .text-component or similar, but if not, use all children except script/style
      const textComponent = panel.querySelector('.text-component');
      if (textComponent) {
        // Reference the actual textComponent element (do not clone)
        contentCell = textComponent;
      } else {
        // Collect all element children of panel (excluding script/style)
        const children = Array.from(panel.children).filter(child => child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE');
        if (children.length > 0) {
          contentCell = children.length === 1 ? children[0] : children;
        } else {
          contentCell = document.createElement('div');
        }
      }
    } else {
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
